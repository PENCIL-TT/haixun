import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Ship, CheckCircle, DollarSign, Globe } from "lucide-react";
import { getCurrentCountryFromPath } from "@/services/countryDetection";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  return null;
};

const LCL = () => {
  const location = useLocation();
  const currentCountry = getCurrentCountryFromPath(location.pathname);

  const features = [
    {
      icon: CheckCircle,
      title: "Extremely Reliable & Prompt",
      description:
        "All your LCL cargo is reliably transported through our seamlessly connected network across the globe, and you are assured that your cargo will arrive on time.",
    },
    {
      icon: DollarSign,
      title: "Flexible and Economical",
      description:
        "LCL services enable customers to ship small orders at a lower cost and in lower volumes compared to air freight.",
    },
    {
      icon: Globe,
      title: "Global Network",
      description:
        "Our LCL network offers unmatched connectivity and cadence across major shipping routes.",
    },
  ];

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <ScrollToTop />
      <Navigation />

      <main className="flex-grow pt-20">

        {/* Breadcrumb + Header Section */}
        <section
          className="relative border-b border-gray-200 py-20"
          style={{
            backgroundImage: "url('/Screenshot 2025-11-21 at 5.07.40 PM.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-kargon-red">LCL</span> Services
            </h1>

            {/* Centered Breadcrumb */}
            <nav className="flex justify-center items-center text-gray-700 text-lg md:text-xl font-medium space-x-3">
              <Link to="/" className="hover:text-kargon-red">Home</Link>
              <span className="text-gray-500">›</span>

              <Link to="/services" className="hover:text-kargon-red">Services</Link>
              <span className="text-gray-500">›</span>

              <span className="text-kargon-red font-semibold">LCL Services</span>
            </nav>

          </div>
        </section>

        {/* Hero / Intro Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-slate-50" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-xl max-w-3xl mx-auto leading-relaxed text-gray-700">
                Less Container Load shipping solutions for optimal convenience and cost efficiency.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

              {/* Left Text */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold mb-4 text-kargon-red">Efficient LCL Solutions</h2>

                <p className="text-lg leading-relaxed text-gray-700">
                  Amass Freight, Dubai is one of the leading logistics providers in the region providing Less-Than Container load (LCL) for the ultimate convenience of our customers.
                </p>
                <p className="text-lg leading-relaxed text-gray-700">
                  LCL allows customers to ship smaller volumes by consolidating cargo with others, reducing waste and significantly lowering cost.
                </p>
                <p className="text-lg leading-relaxed text-gray-700">
                  We ensure your shipments arrive safely and on time through our dedicated ocean freight services.
                </p>
              </motion.div>

              {/* Right Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    alt="LCL Shipping"
                    loading="lazy"
                    className="w-full h-96 object-cover"
                    src="/lcl1.JPG"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                <div className="absolute -bottom-6 -right-6 p-4 rounded-xl shadow-lg bg-kargon-red">
                  <Ship className="w-8 h-8 text-white" />
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-kargon-red mb-6">
                Why Choose Our LCL Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our LCL network offers unmatched connectivity across the globe.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-2xl p-8 text-center bg-slate-100"
                >
                  <div className="w-16 h-16 bg-kargon-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-kargon-red" />
                  </div>
                  <h3 className="text-xl font-bold text-kargon-red mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-kargon-red text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Ship with LCL?
              </h2>

              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Contact us today for competitive rates and dependable LCL shipping.
              </p>

              <Link
                to="/contact"
                className="inline-flex items-center bg-white text-kargon-red px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
              >
                Get Quote Now
              </Link>
            </motion.div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default LCL;
