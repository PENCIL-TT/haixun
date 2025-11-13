import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Truck, Ship } from "lucide-react";
import { getCurrentCountryFromPath } from "@/services/countryDetection";

const BRAND_RED = "#BC0018";

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
        {/* ======================= BREADCRUMB ======================= */}
        <section className="relative h-[380px] w-full flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/breadcrumb-bg.png')" }}
          ></div>

          <div className="absolute inset-0 bg-black/60"></div>

          <div className="relative text-center text-white">
            <p
              className="font-semibold tracking-wide mb-2"
              style={{ color: BRAND_RED }}
            >
              About Us
            </p>

            <h1 className="text-5xl md:text-6xl font-bold">About Us</h1>

            <p className="mt-4 text-white/80 text-sm">
              <Link to="/" className="hover:text-white">
                Home
              </Link>{" "}
              / <span className="text-white">About Us</span>
            </p>
          </div>
        </section>

        {/* ======================= HERO SECTION ======================= */}
        <section className="relative bg-white py-20 md:py-24 overflow-hidden">
          {/* plane path background – moved a bit down */}
          <img
            src="/plan-location.png"
            alt="plane-path"
            className="pointer-events-none hidden lg:block absolute -left-40 top-1/2 w-[360px] opacity-25"
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* LEFT IMAGE */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45 }}
                className="relative"
              >
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

                {/* circular badge */}
                <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-white shadow-lg hidden sm:flex items-center justify-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${BRAND_RED}20` }}
                  >
                    <Ship className="w-10 h-10" style={{ color: BRAND_RED }} />
                  </div>
                </div>

                {/* red stats box */}
                <div
                  className="absolute -bottom-10 left-10 rounded-3xl px-8 py-5 text-white shadow-xl"
                  style={{ backgroundColor: BRAND_RED }}
                >
                  <span className="text-4xl font-bold">9+</span>
                  <p className="text-sm text-white/90">Years of Growth</p>
                </div>
              </motion.div>

              {/* RIGHT TEXT */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45 }}
                className="space-y-6 md:space-y-7"
              >
                <p
                  className="text-sm font-semibold uppercase tracking-wide"
                  style={{ color: BRAND_RED }}
                >
                  {t("about.whoWeAre")}
                </p>

                <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                  {t("about.title")}
                </h1>

                <p className="text-lg text-gray-700">{t("about.subtitle")}</p>
                <p className="text-base text-gray-700">{t("about.paragraph1")}</p>
                <p className="text-base text-gray-700">{t("about.paragraph2")}</p>
                <p className="text-base text-gray-700">{t("about.paragraph3")}</p>

                {/* CTA moved a bit down */}
                <div className="pt-6 md:pt-8">
                  <Link to="/contact">
                    <Button
                      className="text-white px-7 py-5 text-sm rounded-full"
                      style={{ backgroundColor: BRAND_RED }}
                    >
                      {t("nav.contact")}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ======================= SERVICES ======================= */}
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-center text-4xl font-bold mb-14"
              style={{ color: BRAND_RED }}
            >
              Our Core Services
            </h2>

            <div className="flex justify-center gap-10 flex-wrap">
              {/* LCL CARD */}
              <div className="w-full sm:w-[360px]">
                <div
                  className="rounded-3xl px-8 py-10 shadow-xl text-center"
                  style={{ backgroundColor: BRANDRED }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2"
                    style={{ backgroundColor: `${BRAND_RED}30` }}
                  >
                    <Ship className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl text-white font-semibold">LCL Services</h3>
                  <p className="text-sm text-white/90 mt-2">
                    Amass Freight, Dubai is one of the leading logistics providers...
                  </p>

                  <Link
                    to={getNavLink("/services/lcl")}
                    className="text-white underline mt-3 inline-block"
                  >
                    Read more →
                  </Link>
                </div>
              </div>

              {/* CFS CARD */}
              <div className="w-full sm:w-[360px]">
                <div
                  className="rounded-3xl px-8 py-10 shadow-xl text-center"
                  style={{ backgroundColor: BRAND_RED }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2"
                    style={{ backgroundColor: `${BRAND_RED}30` }}
                  >
                    <Truck className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl text-white font-semibold">CFS Services</h3>
                  <p className="text-sm text-white/90 mt-2">
                    Take full advantage of our state-of-the-art CFS...
                  </p>

                  <Link
                    to={getNavLink("/services/cfs")}
                    className="text-white underline mt-3 inline-block"
                  >
                    Read more →
                  </Link>
                </div>
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
