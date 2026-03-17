import { Award, Users, Heart, TrendingUp } from "lucide-react";

const About = () => {
  const stats = [
    {
      icon: Users,
      value: "10,000+",
      label: "Patients Served",
    },
    {
      icon: Award,
      value: "15+",
      label: "Years Experience",
    },
    {
      icon: Heart,
      value: "99%",
      label: "Patient Satisfaction",
    },
    {
      icon: TrendingUp,
      value: "24/7",
      label: "Available Support",
    },
  ];

  return (
    <section
      id="about"
      data-testid="about-section"
      className="py-16 lg:py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image */}
          <div className="relative animate-fade-up">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1759987383760-327efaf5522a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTV8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBtZWRpY2FsJTIwY2xpbmljJTIwcmVjZXB0aW9uJTIwd2FpdGluZyUyMGFyZWElMjBjbGVhbnxlbnwwfHx8fDE3NzM3NjEyNTN8MA&ixlib=rb-4.1.0&q=85"
                alt="Sunlit, clean, and welcoming waiting area"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary/20"></div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 glass-card rounded-2xl p-6 shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-heading font-bold text-lg text-primary">
                    Compassionate
                  </p>
                  <p className="text-sm text-gray-600">Patient Care</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-8 animate-fade-up delay-200">
            <div>
              <span className="px-4 py-2 bg-secondary/30 text-primary rounded-full text-sm font-medium">
                About Us
              </span>
            </div>

            <h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-primary leading-tight">
              Centre for Scan by Dr. Sanchita Saha
            </h2>

            <div className="space-y-4 text-base lg:text-lg text-gray-700 leading-relaxed">
              <p>
                Welcome to Centre for Scan, where cutting-edge diagnostic
                technology meets compassionate care. Under the expert guidance
                of Dr. Sanchita Saha, we have been serving our community with
                dedication and precision for over 15 years.
              </p>
              <p>
                Our state-of-the-art facility is equipped with the latest
                diagnostic equipment, ensuring accurate results and timely
                diagnosis. We believe in a patient-first approach, providing
                personalized care and clear communication at every step.
              </p>
              <p>
                From routine check-ups to specialized diagnostic procedures, our
                team is committed to your health and well-being. We take pride
                in maintaining the highest standards of quality and safety.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className="glass-card rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <Icon className="w-8 h-8 text-accent mb-3" />
                    <p className="font-heading font-bold text-2xl text-primary mb-1">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;