import { Activity, Radio, MessageSquare } from "lucide-react";

const Facilities = () => {
  const facilities = [
    {
      id: 1,
      title: "Ultrasound",
      description:
        "Advanced ultrasound imaging for accurate diagnosis. Our state-of-the-art equipment ensures clear, detailed images for comprehensive assessment.",
      icon: Activity,
      image:
        "https://images.unsplash.com/photo-1664902265139-934219cee42f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MTN8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBtZWRpY2FsJTIwdWx0cmFzb3VuZCUyMG1hY2hpbmUlMjBjbGluaWN8ZW58MHx8fHwxNzczNzYxMjUxfDA&ixlib=rb-4.1.0&q=85",
      size: "large",
    },
    {
      id: 2,
      title: "X-Ray",
      description:
        "Digital X-ray services with minimal radiation exposure. Quick results and expert interpretation for all your diagnostic needs.",
      icon: Radio,
      image:
        "https://images.unsplash.com/photo-1764885518098-781b23d50e7f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NjZ8MHwxfHNlYXJjaHw0fHxkaWdpdGFsJTIweHJheSUyMG1hY2hpbmUlMjBtb2Rlcm4lMjBob3NwaXRhbHxlbnwwfHx8fDE3NzM3NjEyNTF8MA&ixlib=rb-4.1.0&q=85",
      size: "small",
    },
    {
      id: 3,
      title: "Consultancy",
      description:
        "Expert medical consultation and diagnostic interpretation. Personalized care with detailed explanations of your test results.",
      icon: MessageSquare,
      image:
        "https://images.unsplash.com/photo-1759987383760-327efaf5522a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTV8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBtZWRpY2FsJTIwY2xpbmljJTIwcmVjZXB0aW9uJTIwd2FpdGluZyUyMGFyZWElMjBjbGVhbnxlbnwwfHx8fDE3NzM3NjEyNTN8MA&ixlib=rb-4.1.0&q=85",
      size: "small",
    },
  ];

  return (
    <section
      id="facilities"
      data-testid="facilities-section"
      className="py-16 lg:py-24 bg-gradient-to-b from-white to-accent/5"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16 space-y-4">
          <h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-primary">
            Our Facilities
          </h2>
          <p className="text-base lg:text-lg text-gray-700 max-w-2xl mx-auto">
            Equipped with modern technology to provide you with the most
            accurate diagnostic services
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {facilities.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <div
                key={facility.id}
                data-testid={`facility-${facility.title.toLowerCase()}`}
                className={`group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 ${
                  facility.size === "large" ? "md:row-span-2" : ""
                } animate-fade-up delay-${index + 1}00`}
              >
                {/* Background Image */}
                <div className="relative h-full min-h-[300px]">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent opacity-80"></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="glass-card rounded-2xl p-6 space-y-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-heading font-bold text-2xl text-primary">
                        {facility.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {facility.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Facilities;