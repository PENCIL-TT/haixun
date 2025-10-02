import { motion } from "framer-motion";
import { Truck, Settings, Users } from "lucide-react";
import { useTranslation } from 'react-i18next';
import ScrollAnimation from "./ScrollAnimation";

export default function AdvantagesSection() {
  const { t } = useTranslation();
  
  const advantages = [
    {
      icon: Truck,
      titleKey: "advantages.transportation.title",
      descriptionKey: "advantages.transportation.description",
    },
    {
      icon: Settings,
      titleKey: "advantages.logistics.title",
      descriptionKey: "advantages.logistics.description",
    },
    {
      icon: Users,
      titleKey: "advantages.team.title",
      descriptionKey: "advantages.team.description",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <ScrollAnimation className="text-center mb-14">
          <h2 className="font-bold text-gray-900 text-4xl md:text-5xl mb-4">
            {t('advantages.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('advantages.subtitle')}
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
                  {t(advantage.titleKey)}
                </h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  {t(advantage.descriptionKey)}
                </p>
              </motion.div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
