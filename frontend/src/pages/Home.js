import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Facilities from "@/components/Facilities";
import About from "@/components/About";
import Location from "@/components/Location";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Facilities />
      <About />
      <Location />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Home;