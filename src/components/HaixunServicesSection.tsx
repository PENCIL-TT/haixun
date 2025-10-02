import { motion } from "framer-motion";
import { Ship, Boxes, Warehouse, Package, Plane, FileCheck, ArrowDownToLine, Container } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollAnimation from "./ScrollAnimation";

const services = [
  {
    icon: Boxes,
    title: "LCL Services",
    description:
      "HAIXUN operate own consolidation service on many trade routes. HAIXUN Provide complete transparency of all the pricing at the origin, destination and ocean freight charges...",
    link: "/services/lcl",
  },
  {
    icon: Ship,
    title: "FCL Services",
    description:
      "HAIXUN has own fleet of containers including special equipment's to accommodate special requirements of customers and specializes in many trade lanes.",
    link: "/services",
  },
  {
    icon: Warehouse,
    title: "Warehouse Management",
    description:
      "HAIXUN is well equipped to handle the warehousing of various commodities including cold storage with cutting edge technology.",
    link: "/services",
  },
  {
    icon: Package,
    title: "Project Logistics",
    description:
      "With Dedicated project division having experts in the field inherited from major project handlers.",
    link: "/services",
  },
  {
    icon: Plane,
    title: "Air Shipments",
    description:
      "HAIXUN can provide customized sea-air & air-sea options to meet customer's deadline/timeliness and achieve cost savings.",
    link: "/services",
  },
  {
    icon: FileCheck,
    title: "Customs Declaration & Inspection",
    description:
      "As one of the leading custom clearing agents, we ensure that all clearance formalities are done in a smooth and easy manner.",
    link: "/services",
  },
  {
    icon: ArrowDownToLine,
    title: "Import",
    description:
      "Comprehensive import handling services with warehouse and yard facilities, crane and container handling equipment's.",
    link: "/services",
  },
  {
    icon: Container,
    title: "LCL Consolidation",
    description:
      "Export Direct Consol to various destinations including Singapore, Colombo, Karachi, and connecting to major hubs worldwide.",
    link: "/services/lcl",
  },
];

export default function HaixunServicesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <ScrollAnimation className="text-center mb-14">
          <h2 className="font-bold text-gray-900 text-4xl md:text-5xl mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive logistics solutions tailored to your needs
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
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-4 text-red-600 font-medium text-sm group-hover:underline">
                    Read more →
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
