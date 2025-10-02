import { motion } from "framer-motion";
import { Ship, Boxes, Warehouse, Package, Plane, FileCheck, ArrowDownToLine, Container } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import ScrollAnimation from "./ScrollAnimation";

export default function HaixunServicesSection() {
  const { t } = useTranslation();
  
  const services = [
    {
      icon: Boxes,
      titleKey: "services.lcl.title",
      descriptionKey: "services.lcl.description",
      link: "/services/lcl",
    },
    {
      icon: Ship,
      titleKey: "services.fcl.title",
      descriptionKey: "services.fcl.description",
      link: "/services",
    },
    {
      icon: Warehouse,
      titleKey: "services.warehouse.title",
      descriptionKey: "services.warehouse.description",
      link: "/services",
    },
    {
      icon: Package,
      titleKey: "services.project.title",
      descriptionKey: "services.project.description",
      link: "/services",
    },
    {
      icon: Plane,
      titleKey: "services.air.title",
      descriptionKey: "services.air.description",
      link: "/services",
    },
    {
      icon: FileCheck,
      titleKey: "services.customs.title",
      descriptionKey: "services.customs.description",
      link: "/services",
    },
    {
      icon: ArrowDownToLine,
      titleKey: "services.import.title",
      descriptionKey: "services.import.description",
      link: "/services",
    },
    {
      icon: Container,
      titleKey: "services.consolidation.title",
      descriptionKey: "services.consolidation.description",
      link: "/services/lcl",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <ScrollAnimation className="text-center mb-14">
          <h2 className="font-bold text-gray-900 text-4xl md:text-5xl mb-4">
            {t('services.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ScrollAnimation key={index} delay={index * 50}>
              <Link to={service.link}>
                <motion.div
                  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-red-600 transition-all duration-300 h-full group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-700 transition-colors">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t(service.descriptionKey)}
                  </p>
                  <div className="mt-4 text-red-600 font-medium text-sm group-hover:underline">
                    {t('services.readMore')} →
                  </div>
                </motion.div>
              </Link>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
