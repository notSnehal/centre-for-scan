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
      content: "+91 1234567890",
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

          {/* Map Placeholder */}
          <div className="animate-fade-up delay-200">
            <div className="glass-card rounded-3xl overflow-hidden shadow-xl h-full min-h-[400px]">
              <div className="relative w-full h-full bg-gradient-to-br from-blue-100 to-pink-100 flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <MapPin className="w-16 h-16 text-primary mx-auto" />
                  <p className="font-heading font-semibold text-xl text-primary">
                    Map Location
                  </p>
                  <p className="text-gray-700">
                    We are conveniently located in the heart of the medical
                    district, easily accessible by public transport and with
                    ample parking available.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;