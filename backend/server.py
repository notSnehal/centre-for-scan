from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import asyncio
import resend


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend configuration
resend.api_key = os.environ.get('RESEND_API_KEY')
NOTIFICATION_EMAIL = os.environ.get('NOTIFICATION_EMAIL', 'singhsnehalk@gmail.com')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str


# Routes
@api_router.get("/")
async def root():
    return {"message": "Centre for Scan API"}

@api_router.post("/contact")
async def create_contact_submission(input: ContactSubmissionCreate):
    """
    Handle contact form submissions and send email notification
    """
    contact_dict = input.model_dump()
    contact_obj = ContactSubmission(**contact_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = contact_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    # Insert into MongoDB
    result = await db.contacts.insert_one(doc)
    
    # Send email notification (non-blocking)
    try:
        email_html = f"""
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #2E86DE 0%, #EC4899 100%); padding: 30px; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
                <p style="color: white; margin: 5px 0 0 0;">Centre for Scan by Dr. Sanchita Saha</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
                <h2 style="color: #2E86DE; margin-top: 0;">Patient Information</h2>
                
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6;">
                            <strong style="color: #495057;">Name:</strong>
                        </td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6; color: #212529;">
                            {contact_obj.name}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6;">
                            <strong style="color: #495057;">Email:</strong>
                        </td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6; color: #212529;">
                            <a href="mailto:{contact_obj.email}" style="color: #2E86DE; text-decoration: none;">
                                {contact_obj.email}
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6;">
                            <strong style="color: #495057;">Phone:</strong>
                        </td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6; color: #212529;">
                            {contact_obj.phone or 'Not provided'}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; vertical-align: top;">
                            <strong style="color: #495057;">Message:</strong>
                        </td>
                        <td style="padding: 10px 0; color: #212529;">
                            {contact_obj.message}
                        </td>
                    </tr>
                </table>
                
                <div style="margin-top: 20px; padding: 15px; background: white; border-radius: 5px; border-left: 4px solid #EC4899;">
                    <p style="margin: 0; color: #6c757d; font-size: 14px;">
                        <strong>Submitted:</strong> {contact_obj.timestamp.strftime('%B %d, %Y at %I:%M %p')}
                    </p>
                </div>
            </div>
            
            <div style="margin-top: 20px; text-align: center; color: #6c757d; font-size: 12px;">
                <p>This is an automated notification from your website contact form.</p>
            </div>
        </body>
        </html>
        """
        
        email_params = {
            "from": "Centre for Scan <onboarding@resend.dev>",
            "to": [NOTIFICATION_EMAIL],
            "subject": f"New Contact Form Inquiry from {contact_obj.name}",
            "html": email_html
        }
        
        # Send email in background (non-blocking)
        await asyncio.to_thread(resend.Emails.send, email_params)
        logger.info(f"Email notification sent for contact submission: {contact_obj.id}")
        
    except Exception as e:
        # Log error but don't fail the request
        logger.error(f"Failed to send email notification: {str(e)}")
    
    return {
        "message": "Contact form submitted successfully",
        "id": contact_obj.id
    }

@api_router.get("/contacts")
async def get_contact_submissions():
    """
    Get all contact submissions (for admin use)
    """
    # Exclude MongoDB's _id field from the query results
    contacts = await db.contacts.find({}, {"_id": 0}).sort("timestamp", -1).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for contact in contacts:
        if isinstance(contact['timestamp'], str):
            contact['timestamp'] = datetime.fromisoformat(contact['timestamp'])
    
    return contacts

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()