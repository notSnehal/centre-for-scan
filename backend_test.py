import requests
import sys
from datetime import datetime
import json

class DiagnosticCentreAPITester:
    def __init__(self, base_url="https://dr-saha-diagnostics.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.errors = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                if response.headers.get('content-type', '').startswith('application/json'):
                    try:
                        response_data = response.json()
                        print(f"   Response: {json.dumps(response_data, indent=2)}")
                    except:
                        pass
            else:
                error_msg = f"Expected {expected_status}, got {response.status_code}"
                self.errors.append(f"{name}: {error_msg}")
                print(f"❌ Failed - {error_msg}")
                try:
                    print(f"   Response: {response.text}")
                except:
                    pass

            return success, response

        except Exception as e:
            error_msg = f"Error: {str(e)}"
            self.errors.append(f"{name}: {error_msg}")
            print(f"❌ Failed - {error_msg}")
            return False, None

    def test_api_root(self):
        """Test API root endpoint"""
        success, response = self.run_test(
            "API Root",
            "GET",
            "/api/",
            200
        )
        return success

    def test_contact_submission(self):
        """Test contact form submission"""
        contact_data = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "email": "test@example.com",
            "phone": "+91 9876543210",
            "message": "This is a test message for the diagnostic centre contact form."
        }
        
        success, response = self.run_test(
            "Contact Form Submission",
            "POST",
            "/api/contact",
            200,
            data=contact_data
        )
        
        if success and response:
            try:
                response_data = response.json()
                if 'id' in response_data and 'message' in response_data:
                    print(f"   ✅ Contact ID generated: {response_data['id']}")
                    return response_data['id']
                else:
                    self.errors.append("Contact Form Submission: Missing id or message in response")
                    return None
            except:
                self.errors.append("Contact Form Submission: Invalid JSON response")
                return None
        
        return None

    def test_contact_submission_validation(self):
        """Test contact form validation"""
        # Test missing required fields
        invalid_data = {
            "name": "",
            "email": "invalid-email",
            "message": ""
        }
        
        success, response = self.run_test(
            "Contact Form Validation (Invalid)",
            "POST",
            "/api/contact",
            422,  # Expecting validation error
            data=invalid_data
        )
        return success

    def test_get_contacts(self):
        """Test getting all contact submissions"""
        success, response = self.run_test(
            "Get Contact Submissions",
            "GET",
            "/api/contacts",
            200
        )
        
        if success and response:
            try:
                contacts = response.json()
                if isinstance(contacts, list):
                    print(f"   ✅ Retrieved {len(contacts)} contact submissions")
                    return True
                else:
                    self.errors.append("Get Contacts: Response is not a list")
                    return False
            except:
                self.errors.append("Get Contacts: Invalid JSON response")
                return False
        
        return False

def main():
    print("🚀 Starting Diagnostic Centre API Testing...")
    print("=" * 60)
    
    # Setup
    tester = DiagnosticCentreAPITester()
    
    # Test sequence
    print("\n📋 Testing API Endpoints...")
    
    # Test 1: API Root
    tester.test_api_root()
    
    # Test 2: Contact form submission
    contact_id = tester.test_contact_submission()
    
    # Test 3: Contact form validation
    tester.test_contact_submission_validation()
    
    # Test 4: Get contact submissions
    tester.test_get_contacts()
    
    # Print final results
    print("\n" + "=" * 60)
    print(f"📊 FINAL RESULTS:")
    print(f"   Tests Run: {tester.tests_run}")
    print(f"   Tests Passed: {tester.tests_passed}")
    print(f"   Tests Failed: {tester.tests_run - tester.tests_passed}")
    print(f"   Success Rate: {(tester.tests_passed / tester.tests_run * 100):.1f}%")
    
    if tester.errors:
        print(f"\n❌ ERRORS FOUND:")
        for error in tester.errors:
            print(f"   - {error}")
    else:
        print(f"\n✅ ALL TESTS PASSED!")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())