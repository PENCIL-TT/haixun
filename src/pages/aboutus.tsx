import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Truck, Ship, MapPin, Mail } from "lucide-react";
import { getCurrentCountryFromPath } from "@/services/countryDetection";

const BRAND_RED = "#BC0018";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

/** All core services with full content */
const CORE_SERVICES = [
  {
    key: "lcl-services",
    title: "LCL Services",
    icon: Ship,
    short:
      "Own consolidation services on key trade routes with competitive prices, multiple sailings, and transparent pricing.",
    full: `HAIXUN operate own consolidation service on many trade routes. With its vast network of consolidators, the company is able to provide competitive price with multiple options of sailing.

With regular consolidation boxes to important trade lanes, the company has the advantage of accommodating cargo which requires timely deliveries.

HAIXUN provide complete transparency of all the pricing at the origin, destination and ocean freight charges.`,
  },
  {
    key: "fcl-services",
    title: "FCL Services",
    icon: Ship,
    short:
      "Own fleet of containers and special equipment, multiple carrier options, and end-to-end FCL handling.",
    full: `HAIXUN has own fleet of containers including special equipment’s to accommodate special requirements of customers and specializes in many trade lanes.

Being sea freight professionals with vast experience in the field helps to match frequent sailing and flexible service options. Multiple carrier options on any trade route with contracted rates help to secure the space, allocation, timing, pricing and frequency of your shipments.

FCL is the most optimized container shipping way regarding cost, volume and weight of the cargo. We take special care at each step of the process which involves:
• Fixing contract pricing with carriers  
• Reserving space and making bookings  
• Picking up empty containers at the container depot  
• Loading at shipper facility  
• Transporting by truck / rail to the port and vessel loading  
• Monitoring vessel schedule till final delivery to consignee

For import bookings we engage our overseas partners in the absence of our own network and monitor each step and keep our customers / consignees informed at all stages.`,
  },
  {
    key: "warehouse-management",
    title: "Warehouse Management",
    icon: Truck,
    short:
      "Comprehensive warehousing (including cold storage) and WM solutions that turn your warehouse into a growth driver.",
    full: `HAIXUN is well equipped to handle the warehousing of various commodities including cold storage.

Warehouse management (WM) is a key part of the supply chain and primarily aims to control the movement and storage of materials within a warehouse and process the associated transactions including shipping, receiving, put away and picking.

With visibility into processes that precede and follow the supply chain link, your warehouse will become an accelerator and not a roadblock to drive greater profitability and customer satisfaction.

The objective of WM is to handle the receipts of stock and manage supplies. WM today is part of supply chain management and also demand management. It also covers container storage, loading and unloading. An efficient WM gives a cutting edge to retail chain distribution.

The company identifies the customer needs and assists to handle them in the best possible manner. The company has expertise in handling vanning and devanning of consolidation cargo and arranges to distribute/deliver to respective parties from the warehouse which delivers full satisfaction to its customers.

With its network in domestic and global market, HX can identify the right kind of warehouse depending on customer’s requirement based on cost-effective, storage-specific, commodity-specific and proximity-specific needs.`,
  },
  {
    key: "project-logistics",
    title: "Project Logistics",
    icon: Truck,
    short:
      "Dedicated project division for complex, over-dimension cargoes, including floating crane operations and breakbulk.",
    full: `With a dedicated project division having experts in the field inherited from major project handlers, HAIXUN is well equipped to handle all kinds of special and complex project cargoes including the ones which need to be handled using floating cranes.

The expert team is well familiar with handling special and complex over-width and over-height cargo right from the ex-works until the door delivery smoothly and safely.

Breakbulk handling experts have the right kind of strategy and contacts from the load point to the destination point and arrange for the right kind of resource as it requires more manpower and handling equipment.

The projects are well studied and all costs are done in a very transparent manner wherein the customers know the exact costing which is important for their projects.`,
  },
  {
    key: "air-shipments",
    title: "Air Shipments",
    icon: Truck,
    short:
      "Customized sea–air and air–sea combinations plus airfreight consolidation on major routes.",
    full: `HAIXUN can provide customized sea–air and air–sea options to meet customer’s deadlines/timeliness and achieve cost savings.

The company handles airfreight consolidation on many major routes through its efficient worldwide network.`,
  },
  {
    key: "customs-declaration",
    title: "Customs Declaration & Inspection",
    icon: Ship,
    short:
      "Smooth customs clearance and trade compliance support so cargo moves on time across sea, land, and air.",
    full: `As one of the leading custom clearing agents, we ensure that all clearance formalities are done in a smooth and easy manner so that all our customers receive their goods on time.

Our customs brokers help ease import and export regulations and all paperwork related to trade compliances and procedures to ensure that your consignments via sea, land and air leave on time.`,
  },
  {
    key: "oog-shipments",
    title: "OOG Shipments – Inter Island Movements",
    icon: Ship,
    short:
      "End-to-end OOG and inter-island movement services with loading, lashing, equipment, and yard facilities.",
    full: `OOG Shipments - Inter Island Movements

Services Offered:
• Cargo Loading  
• Lashing  
• Surveyor  
• Inter Island Movement to Main Ports  
• Export & Import Handling  
• Ocean Freight  
• Warehouse and Yard Facility  
• Crane and Container Handling Equipment’s  
• Import Stripping and Domestic Movements`,
  },
  {
    key: "lcl-consolidation",
    title: "LCL Consolidation",
    icon: Ship,
    short:
      "Extensive export/import LCL consolidation network via key hubs like Singapore, with value-added warehousing.",
    full: `LCL Consolidation

Export – Direct Consol to Nava Sheva Connecting:
• ICD PPG, ICD Ludhiana  
• ICD Garhiharsru, ICD Ahmedabad  

Export – Direct Consol:
• Singapore  
• Colombo  
• Karachi  

Export Consol Via Singapore Hub to:
• India, Middle East  
• Bangladesh, Maldives  
• Karachi, USA  
• Europe Ports, Australia  

Import Consolidation – Via Singapore Hub:
• Asia, Middle East  
• USA, Europe  

Facilities:
• LCL Consolidation / Deconsolidation Warehouse  
• Packing and Value Added Services`,
  },
];

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
  const [expandedService, setExpandedService] = useState(null);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % sliderImages.length),
      4000
    );
    return () => clearInterval(id);
  }, []);

  const handleToggleService = (key) => {
    setExpandedService((prev) => (prev === key ? null : key));
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <ScrollToTop />
      <Navigation />

      <main className="flex-grow pt-0">
        {/* HERO / BREADCRUMB */}
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

        {/* WHO WE ARE */}
        <section className="relative bg-white py-20 md:py-24 overflow-hidden">
          <img
            src="/plan-location.png"
            alt="plane-path"
            className="pointer-events-none hidden lg:block absolute -left-40 top-[60%] w-[360px] opacity-25"
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
                  <Link to={getNavLink("/contact")}>
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

        {/* OUR CORE SERVICES WITH READ MORE */}
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-center text-4xl font-bold mb-14"
              style={{ color: BRAND_RED }}
            >
              Our Core Services
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {CORE_SERVICES.map((service) => {
                const Icon = service.icon;
                const isExpanded = expandedService === service.key;

                return (
                  <div key={service.key} className="w-full">
                    <div
                      className="rounded-3xl px-8 py-10 shadow-xl text-center h-full flex flex-col"
                      style={{ backgroundColor: BRAND_RED }}
                    >
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
                        style={{ backgroundColor: `${BRAND_RED}30` }}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-2xl text-white font-semibold">
                        {service.title}
                      </h3>

                      {/* short content */}
                      <p className="text-sm text-white/90 mt-3">
                        {service.short}
                      </p>

                      {/* full content only when expanded */}
                      {isExpanded && (
                        <p className="mt-4 text-xs text-white/90 text-left whitespace-pre-line">
                          {service.full}
                        </p>
                      )}

                      <div className="mt-5">
                        <Button
                          variant="outline"
                          className="text-xs font-semibold rounded-full px-4 py-2 border-white/80 text-white hover:bg-white hover:text-[#BC0018]"
                          onClick={() => handleToggleService(service.key)}
                        >
                          {isExpanded ? "Show less" : "Read more"}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* GET IN TOUCH */}
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

              <div className="pt-4 space-y-2">
                <p className="text-xs font-semibold text-slate-500">
                  24/7 Support Center
                </p>
                <p
                  className="text-2xl md:text-3xl font-bold"
                  style={{ color: BRAND_RED }}
                >
                  +86 75582222447
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="bg-white rounded-2xl shadow-md px-6 py-5 space-y-2">
                  <p className="font-semibold text-slate-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4" style={{ color: BRAND_RED }} />
                    Shenzhen Office • China
                  </p>
                  <p className="text-xs text-slate-600">
                    13C02, Block A,
                    Zhaoxin Huijin Plaza 3085 Shennan East Road,
                    <br />
                    Luohu, Shenzhen.
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
