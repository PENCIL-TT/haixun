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

  const sliderImages = ["/Dubai.jpg", "/jebelali1.png", "/burj-khalifa.jpg"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!sliderImages.length) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % sliderImages.length),
      4000
    );
    return () => clearInterval(id);
  }, [sliderImages.length]);

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <ScrollToTop />
      <Navigation />

      <main className="flex-grow pt-20">
        {/* HERO – styled like reference screenshot */}
        <section className="relative bg-white py-20 md:py-24 overflow-hidden">
          {/* soft plane sketch on far left */}
          <img
            src="/plan-location.png"
            alt="plane-path"
            className="pointer-events-none hidden lg:block absolute -left-40 top-1/3 w-[360px] opacity-25"
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* LEFT VISUAL BLOCK */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* main photo card */}
                <div className="relative rounded-[32px] overflow-hidden shadow-[0_28px_60px_rgba(0,0,0,0.22)] bg-slate-900/5">
                  <div className="w-full aspect-[4/3] bg-slate-200">
                    {sliderImages.map((src, i) => (
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
                </div>

                {/* circular badge on top-left */}
                <div className="hidden sm:flex items-center justify-center absolute -top-10 -left-10 w-32 h-32 rounded-full bg-white shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
                  <div className="w-20 h-20 rounded-full bg-kargon-red/10 flex items-center justify-center">
                    <Ship className="w-10 h-10 text-kargon-red" />
                  </div>
                </div>

                {/* bottom red stats block */}
                <div className="absolute -bottom-10 left-6 sm:left-10 bg-kargon-red text-white rounded-2xl sm:rounded-3xl px-8 py-5 shadow-[0_22px_50px_rgba(0,0,0,0.24)]">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold">9+</span>
                    <span className="text-sm sm:text-base font-semibold">
                      Years of Growth
                    </span>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-white/90">
                    Trusted freight and logistics partner across ports and regions.
                  </p>
                </div>
              </motion.div>

              {/* RIGHT CONTENT BLOCK */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true }}
                className="space-y-6 md:space-y-7"
              >
                <p className="text-sm font-semibold text-kargon-red uppercase tracking-[0.18em]">
                  {t("about.whoWeAre")}
                </p>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-slate-900">
                  {t("about.title")}
                </h1>

                <p className="text-base md:text-lg leading-relaxed text-gray-700">
                  {t("about.subtitle")}
                </p>

                <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-700">
                  <p>{t("about.paragraph1")}</p>
                  <p>{t("about.paragraph2")}</p>
                  <p>{t("about.paragraph3")}</p>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link to="/contact">
                    <Button className="bg-kargon-red hover:bg-kargon-red/90 text-white px-7 py-5 text-sm md:text-base font-semibold rounded-full">
                      {t("nav.contact")}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* OUR CORE SERVICES – keep content, apply card style */}
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="text-center text-4xl font-bold text-kargon-red mb-14"
            >
              Our Core Services
            </motion.h2>

            <div className="flex justify-center gap-10 flex-wrap">
              {/* LCL card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true }}
                className="w-full sm:w-[360px]"
              >
                <div className="bg-kargon-red rounded-3xl px-8 py-10 shadow-[0_22px_55px_rgba(0,0,0,0.24)] text-center flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center mb-2">
                    <Ship className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">
                    LCL Services
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-white/90">
                    Amass Freight, Dubai is one of the leading logistics providers
                    in the region providing Less-Than Container load (LCL) for the
                    ultimate convenience of our customers to help in transporting
                    their products to any location required.
                  </p>
                  <Link
                    to={getNavLink("/services/lcl")}
                    className="mt-2 text-sm font-semibold text-white underline-offset-4 hover:underline"
                  >
                    Read more →
                  </Link>
                </div>
              </motion.div>

              {/* CFS card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08 }}
                viewport={{ once: true }}
                className="w-full sm:w-[360px]"
              >
                <div className="bg-kargon-red rounded-3xl px-8 py-10 shadow-[0_22px_55px_rgba(0,0,0,0.24)] text-center flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center mb-2">
                    <Truck className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">
                    CFS Services
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-white/90">
                    Take full advantage of our state-of-the-art CFS, which is
                    equipped with the latest equipment, technology and staffed by
                    experienced professionals at every level. Our warehouses are
                    designed to handle your cargo efficiently across all regions.
                  </p>
                  <Link
                    to={getNavLink("/services/cfs")}
                    className="mt-2 text-sm font-semibold text-white underline-offset-4 hover:underline"
                  >
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
