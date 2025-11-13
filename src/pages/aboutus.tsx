import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Truck, Ship } from "lucide-react";
import { getCurrentCountryFromPath } from "@/services/countryDetection";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

const AboutUs = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const detected = getCurrentCountryFromPath(location.pathname);
  const currentCountry = detected ?? { code: "SG", name: "Singapore" };

  const getNavLink = (basePath: string) => {
    if (currentCountry.code === "SG") return basePath;
    return `/${currentCountry.name.toLowerCase().replace(/\s+/g, "-")}${basePath}`;
  };

  const images = ["/Dubai.jpg", "/jebelali1.png", "/burj-khalifa.jpg"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images.length) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 4000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <ScrollToTop />
      <Navigation />

      <main className="flex-grow pt-20">
        {/* HERO */}
        <section className="py-20 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/quote-two-bg.png')" }}
          ></div>

          <div className="absolute inset-0 bg-white/40"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                {t("about.title")}
              </h1>

              <p className="text-xl max-w-3xl mx-auto leading-relaxed text-gray-700">
                {t("about.subtitle")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              {/* LEFT TEXT */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold mb-4 text-gray-900">{t("about.whoWeAre")}</h2>

                <p className="text-lg leading-relaxed text-gray-700">{t("about.paragraph1")}</p>
                <p className="text-lg leading-relaxed text-gray-700">{t("about.paragraph2")}</p>
                <p className="text-lg leading-relaxed text-gray-700">{t("about.paragraph3")}</p>

                <Link to="/contact" className="inline-block pt-4">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    {t("nav.contact")}
                  </Button>
                </Link>
              </motion.div>

              {/* RIGHT SLIDER */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl shadow-2xl border border-slate-200 bg-slate-100">
                  {images.map((src, i) => (
                    <motion.img
                      key={src}
                      src={src}
                      alt={src}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: i === index ? 1 : 0 }}
                      transition={{ duration: 0.8 }}
                    />
                  ))}
                </div>

                <div className="absolute -bottom-6 -right-6 p-4 rounded-xl shadow-lg bg-kargon-red">
                  <Ship className="w-8 h-8 text-white" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-kargon-red mb-6">Our Core Services</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 items-center relative">

              {/* LEFT IMAGE — SMALLER + FASTER ANIMATION */}
              <motion.img
                src="/plan-location.png"
                alt="service-map"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                viewport={{ once: true }}
                className="
                  md:col-span-1
                  w-[60%]
                  max-w-[260px]
                  object-contain
                  -ml-8
                  -mt-10
                  opacity-85
                "
              />

              {/* SERVICE CARDS */}
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* LCL */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
                  viewport={{ once: true }}
                  className="p-8"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-kargon-red rounded-full flex items-center justify-center mr-4">
                      <Ship className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-kargon-red">LCL Services</h3>
                  </div>

                  <p className="text-gray-700 mb-4">
                    Amass Freight, Dubai is one of the leading logistics providers...
                  </p>

                  <Link to={getNavLink("/services/lcl")} className="text-kargon-red font-medium hover:underline">
                    Read more →
                  </Link>
                </motion.div>

                {/* CFS */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: 0.15 }}
                  viewport={{ once: true }}
                  className="p-8"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-kargon-red rounded-full flex items-center justify-center mr-4">
                      <Truck className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-kargon-red">CFS Services</h3>
                  </div>

                  <p className="text-gray-700 mb-4">
                    Take full advantage of our state-of-the-art CFS...
                  </p>

                  <Link to={getNavLink("/services/cfs")} className="text-kargon-red font-medium hover:underline">
                    Read more →
                  </Link>
                </motion.div>

              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
