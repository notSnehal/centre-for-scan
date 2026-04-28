import { MapPin, Clock, Phone, Mail } from "lucide-react";

const Location = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      content: "C211 Second Floor, M3M Urbana Office Block, Sector-67, Gurgaon",
    },
    {
      icon: Clock,
      title: "Hours",
      content: "Monday - Saturday\nMorning: On Appointment\nEvening: 4:00 PM - 8:00 PM\n\nSunday\n10:00 AM - 2:00 PM",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+91 9871458282",
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@centreforscan.com",
    },
  ];

  return (
    <section
      id="location"
      data-testid="location-section"
      className="py-16 lg:py-24 bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16 space-y-4">
          <h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-primary">
            Visit Us
          </h2>
          <p className="text-base lg:text-lg text-gray-700 max-w-2xl mx-auto">
            Find us easily and plan your visit. We're here to serve you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info Cards */}
          <div className="space-y-6 animate-fade-up">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  data-testid={`location-${info.title.toLowerCase()}`}
                  className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-primary mb-2">
                        {info.title}
                      </h3>
                      <p className="text-gray-700 whitespace-pre-line">
                        {info.content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map */}
          <div className="animate-fade-up delay-200">
            <div className="rounded-3xl overflow-hidden shadow-xl h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.0177!2d77.0714!3d28.4089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d229a87b3c8f9%3A0x7c5b8e2b0c9f3b1a!2sM3M%20Urbana%20Business%20Park%2C%20Sector%2067%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Centre for Scan Location - M3M Urbana, Sector 67, Gurgaon"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;