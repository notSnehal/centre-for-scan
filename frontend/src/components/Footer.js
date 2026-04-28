import { MapPin, Phone, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      data-testid="footer"
      className="bg-primary text-white py-12 lg:py-16"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/logo.png"
                alt="Centre for Scan Logo"
                className="w-10 h-10 object-contain"
              />
              <div>
                <div className="font-heading font-bold text-lg">Centre for Scan</div>
                <div className="text-xs text-white/80">by Dr. Sanchita Saha</div>
              </div>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              Providing expert diagnostic services with compassion and precision
              for over 15 years.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById("facilities");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-sm text-white/80 hover:text-white transition-colors duration-200"
                >
                  Facilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById("about");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-sm text-white/80 hover:text-white transition-colors duration-200"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById("location");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-sm text-white/80 hover:text-white transition-colors duration-200"
                >
                  Location
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById("contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-sm text-white/80 hover:text-white transition-colors duration-200"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm text-white/80">
                  C211 Second Floor, M3M Urbana Office Block, Sector-67, Gurgaon
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm text-white/80">+91 9871458282</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm text-white/80">
                  info@centreforscan.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-white/60">
              © {currentYear} Centre for Scan by Dr. Sanchita Saha. All rights
              reserved.
            </p>
            <p className="text-sm text-white/60 flex items-center space-x-2">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-secondary fill-secondary" />
              <span>for better healthcare</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;