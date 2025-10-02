import { motion } from "framer-motion";
import { Truck, Settings, Users } from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";

const advantages = [
  {
    icon: Truck,
    title: "Transportation Capacity",
    description:
      "With a registered capital of 50 million yuan, the company has Jiefang, Dongfeng and Isuzu light format transportation vehicles, which are engaged in cargo transportation services all over the country.",
  },
  {
    icon: Settings,
    title: "Logistics Service",
    description:
      "The company has advanced information system, which can be seen in the whole process, so that you can master the progress of each business at any time, and strict system prevents errors and accidents.",
  },
  {
    icon: Users,
    title: "Team Personnel",
    description:
      "The company has a highly competitive operation team, has been engaged in domestic cargo transportation services for many years, and has a rigorous transportation organization team.",
  },
];

export default function AdvantagesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <ScrollAnimation className="text-center mb-14">
          <h2 className="font-bold text-gray-900 text-4xl md:text-5xl mb-4">
            Our Advantages
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Delivering excellence through capacity, service, and expertise
          </p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <ScrollAnimation key={index} delay={index * 100}>
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <advantage.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  {advantage.description}
                </p>
              </motion.div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
