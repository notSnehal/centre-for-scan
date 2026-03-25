import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            data-testid="logo"
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src="/logo.png"
              alt="Centre for Scan Logo"
              className="w-12 h-12 object-contain"
            />
            <div className="hidden md:block">
              <div className="font-heading font-bold text-lg text-primary">
                Centre for Scan
              </div>
              <div className="text-xs text-gray-600">by Dr. Sanchita Saha</div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              data-testid="nav-facilities"
              onClick={() => scrollToSection("facilities")}
              className="text-primary hover:text-accent transition-colors duration-200 font-medium"
            >
              Facilities
            </button>
            <button
              data-testid="nav-about"
              onClick={() => scrollToSection("about")}
              className="text-primary hover:text-accent transition-colors duration-200 font-medium"
            >
              About
            </button>
            <button
              data-testid="nav-location"
              onClick={() => scrollToSection("location")}
              className="text-primary hover:text-accent transition-colors duration-200 font-medium"
            >
              Location
            </button>
            <Button
              data-testid="nav-contact-button"
              onClick={() => scrollToSection("contact")}
              className="bg-primary text-white hover:bg-primary/90 rounded-full px-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            data-testid="mobile-menu-button"
            className="md:hidden text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            data-testid="mobile-menu"
            className="md:hidden pb-6 space-y-4 animate-fade-up"
          >
            <button
              data-testid="mobile-nav-facilities"
              onClick={() => scrollToSection("facilities")}
              className="block w-full text-left text-primary hover:text-accent transition-colors duration-200 font-medium py-2"
            >
              Facilities
            </button>
            <button
              data-testid="mobile-nav-about"
              onClick={() => scrollToSection("about")}
              className="block w-full text-left text-primary hover:text-accent transition-colors duration-200 font-medium py-2"
            >
              About
            </button>
            <button
              data-testid="mobile-nav-location"
              onClick={() => scrollToSection("location")}
              className="block w-full text-left text-primary hover:text-accent transition-colors duration-200 font-medium py-2"
            >
              Location
            </button>
            <Button
              data-testid="mobile-nav-contact-button"
              onClick={() => scrollToSection("contact")}
              className="w-full bg-primary text-white hover:bg-primary/90 rounded-full shadow-lg"
            >
              Contact Us
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;