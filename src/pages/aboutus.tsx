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

          <div className="absolute inset-0 bg-white/40" />

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
                transition={{ duration: 0.45 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold mb-4 text-gray-900">
                  {t("about.whoWeAre")}
                </h2>

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
                transition={{ duration: 0.45 }}
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
        <section className="py-24 bg-white relative overflow-visible">
          {/* LEFT IMAGE MOVED TO SCREEN EDGE */}
          <motion.img
            src="/plan-location.png"
            alt="left-plane"
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
            className="
              hidden md:block
              absolute 
              left-0 
              top-1/2 
              -translate-y-1/2
              w-[300px]
              opacity-80
              pointer-events-none
            "
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* FIXED CENTERED TITLE */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="text-center text-4xl font-bold text-kargon-red mb-20"
            >
              Our Core Services
            </motion.h2>

            {/* CENTER THE CARDS */}
            <div className="flex justify-center gap-12 flex-wrap">

              {/* LCL CARD */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true }}
                className="w-[350px]"
              >
                <div className="bg-kargon-red rounded-3xl shadow-[0_18px_35px_rgba(0,0,0,0.16)] px-8 py-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-4">
                    <Ship className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-semibold text-white mb-4">LCL Services</h3>

                  <p className="text-white/90 text-sm leading-relaxed mb-4">
                    Amass Freight, Dubai is one of the leading logistics providers in the region...
                  </p>

                  <Link to={getNavLink("/services/lcl")} className="text-white underline">
                    Read more →
                  </Link>
                </div>
              </motion.div>

              {/* CFS CARD */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                viewport={{ once: true }}
                className="w-[350px]"
              >
                <div className="bg-kargon-red rounded-3xl shadow-[0_18px_35px_rgba(0,0,0,0.16)] px-8 py-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-4">
                    <Truck className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-semibold text-white mb-4">CFS Services</h3>

                  <p className="text-white/90 text-sm leading-relaxed mb-4">
                    Take full advantage of our state-of-the-art CFS...
                  </p>

                  <Link to={getNavLink("/services/cfs")} className="text-white underline">
                    Read more →
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
