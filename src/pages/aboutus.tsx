import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  MapPin,
  Mail,
  Boxes,
  Package,
  Warehouse,
  Construction,
  Plane,
  FileSearch,
  Route,
  Ship,
} from "lucide-react";
import { getCurrentCountryFromPath } from "@/services/countryDetection";

const BRAND_RED = "#BC0018";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

const CORE_SERVICES = [
  {
    key: "lcl-services",
    title: "LCL Services",
    icon: Boxes,
    href: "/services/lcl",
    short:
      "Own consolidation service on key trade routes, competitive pricing with multiple sailings and full transparency.",
  },
  {
    key: "fcl-services",
    title: "FCL Services",
    icon: Package,
    href: "/services/fcl",
    short:
      "Own fleet of containers and special equipment with multiple carrier options and end-to-end handling.",
  },
  {
    key: "warehouse-management",
    title: "Warehouse Management",
    icon: Warehouse,
    href: "/services/warehouse-management",
    short:
      "Comprehensive warehousing for commodities including cold storage and value-added supply chain services.",
  },
  {
    key: "project-logistics",
    title: "Project Logistics",
    icon: Construction,
    href: "/services/project-logistics",
    short:
      "Specialized handling for heavy, over-dimension cargo, floating crane operations and project-specific logistics.",
  },
  {
    key: "air-shipments",
    title: "Air Shipments",
    icon: Plane,
    href: "/services/air-shipments",
    short:
      "Custom air-sea and sea-air solutions with global partner network and route-optimized air freight services.",
  },
  {
    key: "customs-declaration",
    title: "Customs Declaration & Inspection",
    icon: FileSearch,
    href: "/services/customs-declaration",
    short:
      "Smooth customs clearance with expert brokers handling compliance paperwork and import/export regulations.",
  },
  {
    key: "oog-shipments",
    title: "OOG Shipments – Inter Island Movements",
    icon: Route,
    href: "/services/oog-shipments",
    short:
      "End-to-end OOG handling including loading, lashing, surveyor, equipment, warehouse and island movements.",
  },
  {
    key: "lcl-consolidation",
    title: "LCL Consolidation",
    icon: Ship,
    href: "/services/lcl-consolidation",
    short:
      "Global LCL consolidation via Singapore with connected hubs across India, Middle East, USA and Europe.",
  },
];

const AboutUs = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const detected = getCurrentCountryFromPath(location.pathname);
  const currentCountry = detected ?? { code: "SG", name: "Singapore" };

  const getNavLink = (base: string) => {
    if (currentCountry.code === "SG") return base;
    return `/${currentCountry.name.toLowerCase().replace(/\s+/g, "-")}${base}`;
  };

  const sliderImages = ["/Dubai.jpg", "/jebelali1.png", "/burj-khalifa.jpg"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % sliderImages.length),
      4000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <ScrollToTop />
      <Navigation />

      <main className="flex-grow pt-0">
        {/* ================= HERO ================= */}
        <section className="relative h-[260px] md:h-[320px] flex items-center justify-center text-center px-6">
          <img
            src="/breadcrumb-bg.png"
            alt="About Haixun"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* simple dark overlay (no gradient) */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          />

          <div className="relative z-10 container mx-auto max-w-5xl">
            <p className="text-xs md:text-sm text-white/80 mb-2">
              <Link to="/" className="hover:text-white">
                Home
              </Link>
              <span className="mx-2 opacity-70">›</span>
              <span className="text-white">About Us</span>
            </p>

            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              About Us
            </h1>
          </div>
        </section>

        {/* ================= WHO WE ARE ================= */}
        <section className="relative bg-white py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              className="relative"
            >
              <div className="rounded-[32px] overflow-hidden shadow-[0_28px_60px_rgba(188,0,24,0.25)]">
                <div className="w-full aspect-[4/3] relative">
                  {sliderImages.map((src, i) => (
                    <motion.img
                      key={src}
                      src={src}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: i === index ? 1 : 0 }}
                      transition={{ duration: 0.7 }}
                    />
                  ))}
                </div>
              </div>

              <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-white shadow-xl hidden md:flex items-center justify-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${BRAND_RED}30` }}
                >
                  <Ship className="w-10 h-10" style={{ color: BRAND_RED }} />
                </div>
              </div>

              <div
                className="absolute -bottom-10 left-10 px-7 py-5 rounded-3xl shadow-xl text-white"
                style={{ backgroundColor: BRAND_RED }}
              >
                <h2 className="text-4xl font-bold">9+</h2>
                <p className="text-sm">Years of Growth</p>
              </div>
            </motion.div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              className="space-y-6"
            >
              <p
                className="text-sm font-semibold uppercase"
                style={{ color: BRAND_RED }}
              >
                {t("about.whoWeAre")}
              </p>

              <h2
                className="text-4xl md:text-5xl font-bold"
                style={{ color: BRAND_RED }}
              >
                {t("about.title")}
              </h2>

              <p className="text-lg text-gray-700">{t("about.subtitle")}</p>
              <p className="text-gray-700">{t("about.paragraph1")}</p>
              <p className="text-gray-700">{t("about.paragraph2")}</p>
              <p className="text-gray-700">{t("about.paragraph3")}</p>

              <div className="pt-6">
                <Link to={getNavLink("/contact")}>
                  <Button
                    className="text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:brightness-110"
                    style={{ backgroundColor: BRAND_RED }}
                  >
                    {t("nav.contact")}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= SERVICES ================= */}
        <section
          className="py-24"
          style={{
            // keep gradient ONLY here
            background:
              "linear-gradient(135deg, #FFF5F6 0%, #FFECEF 100%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <h2
              className="text-center text-4xl font-bold mb-14"
              style={{ color: BRAND_RED }}
            >
              Our Core Services
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {CORE_SERVICES.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.key}
                    className="rounded-3xl px-8 py-10 text-center bg-white shadow-[0_20px_40px_rgba(188,0,24,0.15)] border border-[#BC001822] flex flex-col"
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: `${BRAND_RED}15` }}
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: idx * 0.12,
                      }}
                    >
                      <Icon className="w-8 h-8" style={{ color: BRAND_RED }} />
                    </motion.div>

                    <h3
                      className="text-2xl font-semibold"
                      style={{ color: BRAND_RED }}
                    >
                      {service.title}
                    </h3>

                    <p className="text-sm text-gray-700 mt-3 flex-1">
                      {service.short}
                    </p>

                    <Link to={getNavLink(service.href)} className="mt-5">
                      <Button
                        className="rounded-full px-4 py-2 text-xs font-semibold bg-[#BC0018] text-white hover:bg-[#a30015]"
                      >
                        Read more
                      </Button>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= GET IN TOUCH ================= */}
        {/* pure white background, no gradient / pink glow */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              className="space-y-6"
            >
              <p
                className="text-sm uppercase font-semibold"
                style={{ color: BRAND_RED }}
              >
                Safe Transportation & Logistics
              </p>

              <h2
                className="text-4xl md:text-5xl font-bold"
                style={{ color: BRAND_RED }}
              >
                Get In Touch
              </h2>

              <p className="text-base text-gray-700 max-w-xl">
                Contact our global team for shipping support, logistics help,
                freight inquiries, and project cargo solutions.
              </p>

              <div className="pt-4">
                <p className="text-xs font-semibold text-gray-500">
                  24/7 Support Center
                </p>
                <p
                  className="text-3xl font-bold"
                  style={{ color: BRAND_RED }}
                >
                  +86 75582222447
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
                <div className="bg-[#FFF5F6] border border-[#BC001822] rounded-2xl p-6 space-y-2">
                  <p
                    className="font-semibold flex items-center gap-2"
                    style={{ color: BRAND_RED }}
                  >
                    <MapPin className="w-4 h-4" />
                    Shenzhen Office • China
                  </p>
                  <p className="text-xs text-gray-700">
                    13C02, Block A, Zhaoxin Huijin Plaza
                    <br />
                    3085 Shennan East Road, Luohu, Shenzhen.
                  </p>
                </div>

                <div className="bg-[#FFF5F6] border border-[#BC001822] rounded-2xl p-6 space-y-2">
                  <p
                    className="font-semibold flex items-center gap-2"
                    style={{ color: BRAND_RED }}
                  >
                    <Mail className="w-4 h-4" />
                    Email Us
                  </p>
                  <p className="text-xs text-gray-700">
                    info@haixun-global.com
                    <br />
                    support@haixun-global.com
                  </p>
                </div>
              </div>
            </motion.div>

            {/* MAP */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden h-[340px] md:h-[420px] border border-[#BC001822]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.174783742364!2d-122.40137852347925!3d37.79228127197342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064b1c95a1f%3A0x0000000000000000!2sYour%20Office!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
