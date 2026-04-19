import { Stethoscope, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      data-testid="hero-section"
      className="relative min-h-screen flex items-center pt-20 bg-gradient-to-br from-white via-blue-50 to-pink-50"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8 animate-fade-up">
              <div className="inline-block">
              <span className="px-4 py-2 bg-pink-100 text-primary rounded-full text-sm font-medium">
                Trusted Diagnostic Centre
              </span>
            </div>

            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-primary leading-tight">
              Expert Diagnostic Care You Can Trust
            </h1>

            <p className="text-base lg:text-lg text-gray-700 leading-relaxed max-w-xl">
              At Centre for Scan by Dr. Sanchita Saha, we provide comprehensive
              diagnostic services with state-of-the-art technology and
              compassionate care. Your health is our priority.
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="glass-card rounded-2xl p-4 text-center hover:shadow-lg transition-shadow duration-300">
                <Stethoscope className="w-8 h-8 mx-auto text-accent mb-2" />
                <p className="text-sm text-gray-600">Expert</p>
                <p className="text-sm text-gray-600">Care</p>
              </div>
              <div className="glass-card rounded-2xl p-4 text-center hover:shadow-lg transition-shadow duration-300">
                <Shield className="w-8 h-8 mx-auto text-accent mb-2" />
                <p className="text-sm text-gray-600">Advanced</p>
                <p className="text-sm text-gray-600">Technology</p>
              </div>
              <div className="glass-card rounded-2xl p-4 text-center hover:shadow-lg transition-shadow duration-300">
                <Clock className="w-8 h-8 mx-auto text-accent mb-2" />
                <p className="text-sm text-gray-600">Quick</p>
                <p className="text-sm text-gray-600">Results</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                data-testid="hero-contact-button"
                onClick={scrollToContact}
                className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Book Appointment
              </Button>
              <Button
                data-testid="hero-facilities-button"
                onClick={() => {
                  const element = document.getElementById("facilities");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full px-8 py-6 text-lg transition-all duration-300"
              >
                View Facilities
              </Button>
            </div>
          </div>

          {/* Right: Image with Floating Cards */}
          <div className="relative animate-fade-up delay-200">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/dr-sanchita.jpg"
                alt="Dr. Sanchita Saha - Expert Diagnostician"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 glass-card rounded-2xl p-6 max-w-xs shadow-xl">
              <p className="text-primary font-heading font-semibold text-lg mb-2">
                Dr. Sanchita Saha
              </p>
              <p className="text-sm text-gray-700">
                Expert diagnostician with years of experience in providing
                accurate and timely diagnostic services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;