import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Truck, Ship, MapPin, PhoneCall, Mail } from "lucide-react";
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
        <section className="relative h-[350px] md:h-[420px] w-full flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{ backgroundImage: "url('/breadcrumb-bg.png')" }}
          ></div>

          <div className="absolute inset-0 bg-black/60" />

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

        {/* ======================= WHO WE ARE BLOCK ======================= */}
        <section className="relative bg-white py-20 md:py-24 overflow-hidden">
          {/* Plane path, subtle on the left */}
          <img
            src="/plan-location.png"
            alt="plane-path"
            className="pointer-events-none hidden lg:block absolute -left-40 top-[60%] w-[360px] opacity-25"
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* LEFT IMAGE PANEL */}
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

              {/* RIGHT TEXT PANEL */}
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

                {/* CTA */}
                <div className="pt-10">
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
                  style={{ backgroundColor: BRAND_RED }}
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

        {/* ======================= GET IN TOUCH / CONTACT BLOCK ======================= */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT: TEXT + PHONE + SMALL CARDS */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              className="space-y-6"
            >
              <p
                className="text-sm font-semibold uppercase tracking-wide"
                style={{ color: BRAND_RED }}
              >
                Safe Transportation &amp; Logistics
              </p>

              <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                Get In Touch
              </h2>

              <p className="text-sm md:text-base text-slate-600 max-w-xl">
                Get in touch with our team for logistics solutions, freight
                inquiries, and global shipping support. We are here to assist you
                across time zones and regions.
              </p>

              {/* Support center */}
              <div className="pt-4 space-y-2">
                <p className="text-xs font-semibold text-slate-500">
                  24/7 Support Center
                </p>
                <p
                  className="text-2xl md:text-3xl font-bold"
                  style={{ color: BRAND_RED }}
                >
                  +1 718-904-4450
                </p>
              </div>

              {/* small cards: HQ + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="bg-white rounded-2xl shadow-md px-6 py-5 space-y-2">
                  <p className="font-semibold text-slate-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4" style={{ color: BRAND_RED }} />
                    Headquarter
                  </p>
                  <p className="text-xs text-slate-600">
                    4517 Washington Ave.
                    <br />
                    Manchester, Kentucky 39495
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-md px-6 py-5 space-y-2">
                  <p className="font-semibold text-slate-900 flex items-center gap-2">
                    <Mail className="w-4 h-4" style={{ color: BRAND_RED }} />
                    Email Us
                  </p>
                  <p className="text-xs text-slate-600">
                    info@haixun-global.com
                    <br />
                    support@haixun-global.com
                  </p>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: MAP + RED CONTACT CARD LIKE SCREENSHOT */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              className="relative"
            >
              {/* world map background (you can replace src with your map image) */}
              <div className="relative bg-white rounded-3xl shadow-xl px-6 py-10 md:px-10 md:py-14 overflow-hidden">
                <div className="absolute inset-6 opacity-80 pointer-events-none">
                  <img
                    src="/world-map-dots.png"
                    alt="Global Offices"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // hide broken image if file is not present yet
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>

                {/* center placeholder so box keeps height even without image */}
                <div className="relative h-[260px] md:h-[300px] flex items-center justify-center text-xs text-slate-400">
                  {/* empty, purely for height; image is absolute above */}
                </div>

                {/* floating contact card (Shenzhen office style) */}
                <div
                  className="absolute left-1/2 bottom-6 -translate-x-1/2 bg-white rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.18)] px-6 py-5 w-[90%] md:w-[70%]"
                  style={{ backgroundColor: BRAND_RED }}
                >
                  <div className="space-y-3 text-white text-sm">
                    <p className="text-base font-semibold">Contact Us</p>
                    <p className="font-semibold text-sm">
                      Shenzhen Office · China
                    </p>

                    <div className="flex items-start gap-2 text-xs">
                      <MapPin className="w-4 h-4 mt-[2px]" />
                      <p>
                        13C02, Block A,
                        <br />
                        Zhaoxin Huijin Plaza 3085 Shennan East Road,
                        <br />
                        Luohu, Shenzhen.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <PhoneCall className="w-4 h-4" />
                      <p>+86 75582222447</p>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <PhoneCall className="w-4 h-4" />
                      <p>Fax: +86 75582192854</p>
                    </div>
                  </div>
                </div>
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
