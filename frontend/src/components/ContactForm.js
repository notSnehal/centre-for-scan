import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Basic validation
      if (!formData.name || !formData.email || !formData.message) {
        toast.error("Please fill in all required fields");
        setIsSubmitting(false);
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email address");
        setIsSubmitting(false);
        return;
      }

      // Submit to backend
      const response = await axios.post(`${API}/contact`, formData);

      if (response.status === 200) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="py-16 lg:py-24 bg-gradient-to-b from-white to-accent/10"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16 space-y-4">
          <h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-primary">
            Get In Touch
          </h2>
          <p className="text-base lg:text-lg text-gray-700">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Form */}
        <div className="glass-card rounded-3xl p-8 lg:p-12 shadow-xl animate-fade-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-primary mb-2"
                >
                  Full Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  data-testid="contact-name-input"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-12 bg-white/50 border-gray-200 focus:border-primary focus:ring-primary/20 rounded-lg"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-primary mb-2"
                >
                  Email Address *
                </label>
                <Input
                  id="email"
                  name="email"
                  data-testid="contact-email-input"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-12 bg-white/50 border-gray-200 focus:border-primary focus:ring-primary/20 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-primary mb-2"
              >
                Phone Number
              </label>
              <Input
                id="phone"
                name="phone"
                data-testid="contact-phone-input"
                type="tel"
                placeholder="+91 1234567890"
                value={formData.phone}
                onChange={handleChange}
                className="h-12 bg-white/50 border-gray-200 focus:border-primary focus:ring-primary/20 rounded-lg"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-primary mb-2"
              >
                Message *
              </label>
              <Textarea
                id="message"
                name="message"
                data-testid="contact-message-input"
                placeholder="Tell us how we can help you..."
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="bg-white/50 border-gray-200 focus:border-primary focus:ring-primary/20 rounded-lg resize-none"
              />
            </div>

            <Button
              type="submit"
              data-testid="contact-submit-button"
              disabled={isSubmitting}
              className="w-full bg-primary text-white hover:bg-primary/90 rounded-full py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;