import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Truck,
  Ship,
  MapPin,
  Mail,
  Plane,
  Package,
  FileText,
  ClipboardList,
  Boxes,
  ArrowRight,
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
        {/* ======================= HERO / BREADCRUMB ======================= */}
        <section className="relative h-[260px] md:h-[320px] w-full flex items-center justify-center text-center px-6">
          <img
            src="/breadcrumb-bg.png"
            alt="About Haixun Global"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 container mx-auto max-w-5xl pt-4 md:pt-6">
            <p className="text-xs md:text-sm text-white/80 mb-2">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span className="mx-2 opacity-70">›</span>
              <span className="text-white">About Us</span>
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">
              About Us
            </h1>
          </div>
        </section>

        {/* ======================= WHO WE ARE ======================= */}
        <section className="relative bg-white py-20 md:py-24 overflow-hidden">
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
                  <div className="w-full aspect-[4/3] bg-slate-200 relative">
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

        {/* ======================= SERVICES (8 BOXES, HAIXUN STYLE) ======================= */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-center text-4xl font-bold mb-14"
              style={{ color: BRAND_RED }}
            >
              Our Core Services
            </h2>

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {/* 1. LCL Services */}
              <div className="rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 rounded-full bg-[#F5F5F7] flex items-center justify-center mb-6">
                    <Ship className="w-8 h-8" style={{ color: BRAND_RED }} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    LCL Services
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    HAIXUN operate own consolidation service on many trade routes.
                    HAIXUN provide complete LCL solutions for your cargo...
                  </p>
                </div>
                <Link to={getNavLink("/services/lcl")} className="mt-6 inline-flex items-center">
                  <span
                    className="text-xs font-semibold tracking-wide px-4 py-2 rounded-md bg-slate-100 inline-flex items-center gap-2"
                    style={{ color: BRAND_RED }}
                  >
                    READ MORE
                    <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                      <ArrowRight className="w-3 h-3" style={{ color: BRAND_RED }} />
                    </span>
                  </span>
                </Link>
              </div>

              {/* 2. FCL Services */}
              <div className="rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 rounded-full bg-[#F5F5F7] flex items-center justify-center mb-6">
                    <Ship className="w-8 h-8" style={{ color: BRAND_RED }} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    FCL Services
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    HAIXUN has own fleet of containers including special equipment
                    to accommodate special cargo requirements...
                  </p>
                </div>
                <Link to={getNavLink("/services/fcl")} className="mt-6 inline-flex items-center">
                  <span
                    className="text-xs font-semibold tracking-wide px-4 py-2 rounded-md bg-slate-100 inline-flex items-center gap-2"
                    style={{ color: BRAND_RED }}
                  >
                    READ MORE
                    <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                      <ArrowRight className="w-3 h-3" style={{ color: BRAND_RED }} />
                    </span>
                  </span>
                </Link>
              </div>

              {/* 3. Warehouse Management */}
              <div className="rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 rounded-full bg-[#F5F5F7] flex items-center justify-center mb-6">
                    <Boxes className="w-8 h-8" style={{ color: BRAND_RED }} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    Warehouse Management
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    HAIXUN is well equipped to handle warehousing of various
                    commodities including cold and specialized storage needs...
                  </p>
                </div>
                <Link
                  to={getNavLink("/services/warehouse-management")}
                  className="mt-6 inline-flex items-center"
                >
                  <span
                    className="text-xs font-semibold tracking-wide px-4 py-2 rounded-md bg-slate-100 inline-flex items-center gap-2"
                    style={{ color: BRAND_RED }}
                  >
                    READ MORE
                    <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                      <ArrowRight className="w-3 h-3" style={{ color: BRAND_RED }} />
                    </span>
                  </span>
                </Link>
              </div>

              {/* 4. Project Logistics */}
              <div className="rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 rounded-full bg-[#F5F5F7] flex items-center justify-center mb-6">
                    <Truck className="w-8 h-8" style={{ color: BRAND_RED }} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    Project Logistics
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    With dedicated project division having experts in the field,
                    we manage complex project logistics from end to end...
                  </p>
                </div>
                <Link
                  to={getNavLink("/services/project-logistics")}
                  className="mt-6 inline-flex items-center"
                >
                  <span
                    className="text-xs font-semibold tracking-wide px-4 py-2 rounded-md bg-slate-100 inline-flex items-center gap-2"
                    style={{ color: BRAND_RED }}
                  >
                    READ MORE
                    <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                      <ArrowRight className="w-3 h-3" style={{ color: BRAND_RED }} />
                    </span>
                  </span>
                </Link>
              </div>

              {/* 5. Air Shipments */}
              <div className="rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 rounded-full bg-[#F5F5F7] flex items-center justify-center mb-6">
                    <Plane className="w-8 h-8" style={{ color: BRAND_RED }} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    Air Shipments
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    HAIXUN can provide customized sea–air and air–sea options to
                    meet customer deadlines and time-critical shipments...
                  </p>
                </div>
                <Link
                  to={getNavLink("/services/air-shipments")}
                  className="mt-6 inline-flex items-center"
                >
                  <span
                    className="text-xs font-semibold tracking-wide px-4 py-2 rounded-md bg-slate-100 inline-flex items-center gap-2"
                    style={{ color: BRAND_RED }}
                  >
                    READ MORE
                    <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                      <ArrowRight className="w-3 h-3" style={{ color: BRAND_RED }} />
                    </span>
                  </span>
                </Link>
              </div>

              {/* 6. Customs Declaration & Ins. */}
              <div className="rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 rounded-full bg-[#F5F5F7] flex items-center justify-center mb-6">
                    <FileText className="w-8 h-8" style={{ color: BRAND_RED }} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    Customs Declaration & Ins.
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    We ensure that all clearance formalities are done in a smooth
                    and easy manner so that your cargo moves without delay...
                  </p>
                </div>
                <Link
                  to={getNavLink("/services/customs-declaration")}
                  className="mt-6 inline-flex items-center"
                >
                  <span
                    className="text-xs font-semibold tracking-wide px-4 py-2 rounded-md bg-slate-100 inline-flex items-center gap-2"
                    style={{ color: BRAND_RED }}
                  >
                    READ MORE
                    <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                      <ArrowRight className="w-3 h-3" style={{ color: BRAND_RED }} />
                    </span>
                  </span>
                </Link>
              </div>

              {/* 7. OOG Shipments */}
              <div className="rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 rounded-full bg-[#F5F5F7] flex items-center justify-center mb-6">
                    <Package className="w-8 h-8" style={{ color: BRAND_RED }} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    OOG Shipments
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Services offered: cargo loading, lashing, surveyor coordination
                    and inter-island movement to main ports for OOG cargo...
                  </p>
                </div>
                <Link
                  to={getNavLink("/services/oog-shipments")}
                  className="mt-6 inline-flex items-center"
                >
                  <span
                    className="text-xs font-semibold tracking-wide px-4 py-2 rounded-md bg-slate-100 inline-flex items-center gap-2"
                    style={{ color: BRAND_RED }}
                  >
                    READ MORE
                    <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                      <ArrowRight className="w-3 h-3" style={{ color: BRAND_RED }} />
                    </span>
                  </span>
                </Link>
              </div>

              {/* 8. LCL Consolidation */}
              <div className="rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 rounded-full bg-[#F5F5F7] flex items-center justify-center mb-6">
                    <ClipboardList className="w-8 h-8" style={{ color: BRAND_RED }} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    LCL Consolidation
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    We ensure that all consolidation and related formalities are
                    handled smoothly so that all smaller shipments move efficiently...
                  </p>
                </div>
                <Link
                  to={getNavLink("/services/lcl-consolidation")}
                  className="mt-6 inline-flex items-center"
                >
                  <span
                    className="text-xs font-semibold tracking-wide px-4 py-2 rounded-md bg-slate-100 inline-flex items-center gap-2"
                    style={{ color: BRAND_RED }}
                  >
                    READ MORE
                    <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                      <ArrowRight className="w-3 h-3" style={{ color: BRAND_RED }} />
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= GET IN TOUCH ======================= */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                Safe Transportation & Logistics
              </p>

              <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                Get In Touch
              </h2>

              <p className="text-sm md:text-base text-slate-600 max-w-xl">
                Get in touch with our team for logistics solutions, freight
                inquiries, and global shipping support. We are here to assist you
                across time zones and regions.
              </p>

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

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              className="relative"
            >
              <div className="w-full h-[320px] md:h-[420px] rounded-3xl overflow-hidden shadow-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.174783742364!2d-122.40137852347925!3d37.79228127197342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064b1c95a1f%3A0x0000000000000000!2sYour%20Office!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
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
