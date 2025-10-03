import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getCurrentCountryFromPath, detectCountryByIP } from "@/services/countryDetection";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

/** Small flag component */
function FlagIcon({
  code,
  className = "h-5 w-7 object-contain rounded-[2px]",
}: {
  code: string;
  className?: string;
}) {
  const iso = (code || "").toLowerCase();
  const src = `/${iso}.svg`;
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={className}
      draggable={false}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.display = "none";
      }}
    />
  );
}

const Navigation = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const currentCountry = getCurrentCountryFromPath(location.pathname);

  // Detect country by IP
  useEffect(() => {
    const detect = async () => {
      try {
        const saved = localStorage.getItem("preferredCountry");
        if (saved) return;
        await detectCountryByIP();
      } catch {
        return;
      }
    };
    detect();
  }, []);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      } relative`}
    >
      {/* 🔴 Red Attached Box */}
      <div className="absolute top-0 right-0 h-full w-1/2 bg-red-700 clip-path-attached"></div>

      {/* Main container */}
      <div className="container relative mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-4 lg:py-[18px]">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img
                src="/haixun-logo.svg"
                alt="Haixun Global Co., Ltd"
                className="h-8 sm:h-12 lg:h-14 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              to="/"
              className={`nav-link font-medium text-base xl:text-lg hover:text-red-600 transition-colors ${
                isActive("/") ? "text-red-600" : isScrolled ? "text-gray-900" : "text-white"
              }`}
            >
              {t("nav.home")}
            </Link>

            <Link
              to="/services"
              className={`nav-link font-medium text-base xl:text-lg hover:text-red-600 transition-colors ${
                isActive("/services") ? "text-red-600" : isScrolled ? "text-gray-900" : "text-white"
              }`}
            >
              {t("nav.services")}
            </Link>

            <Link
              to="/about-us"
              className={`nav-link font-medium text-base xl:text-lg hover:text-red-600 transition-colors ${
                isActive("/about-us") ? "text-red-600" : isScrolled ? "text-gray-900" : "text-white"
              }`}
            >
              {t("nav.about")}
            </Link>

            <Link
              to="/blog"
              className={`nav-link font-medium text-base xl:text-lg hover:text-red-600 transition-colors ${
                isActive("/blog") ? "text-red-600" : isScrolled ? "text-gray-900" : "text-white"
              }`}
            >
              {t("nav.news")}
            </Link>

            <Link
              to="/advantages"
              className={`nav-link font-medium text-base xl:text-lg hover:text-red-600 transition-colors ${
                isActive("/advantages") ? "text-red-600" : isScrolled ? "text-gray-900" : "text-white"
              }`}
            >
              {t("nav.advantage")}
            </Link>

            <Link
              to="/global-presence"
              className={`nav-link font-medium text-base xl:text-lg hover:text-red-600 transition-colors ${
                isActive("/global-presence") ? "text-red-600" : isScrolled ? "text-gray-900" : "text-white"
              }`}
            >
              {t("nav.globalPresence")}
            </Link>

            <Link
              to="/contact"
              className={`nav-link font-medium text-base xl:text-lg hover:text-red-600 transition-colors ${
                isActive("/contact") ? "text-red-600" : isScrolled ? "text-gray-900" : "text-white"
              }`}
            >
              {t("nav.contact")}
            </Link>

            <LanguageSwitcher />
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <X className={isScrolled ? "text-gray-900" : "text-white"} size={24} />
              ) : (
                <Menu className={isScrolled ? "text-gray-900" : "text-white"} size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white py-4 shadow-md animate-fade-in border-t max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-4">
              {[
                { labelKey: "nav.home", path: "/" },
                { labelKey: "nav.services", path: "/services" },
                { labelKey: "nav.about", path: "/about-us" },
                { labelKey: "nav.news", path: "/blog" },
                { labelKey: "nav.advantage", path: "/advantages" },
                { labelKey: "nav.globalPresence", path: "/global-presence" },
                { labelKey: "nav.contact", path: "/contact" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-medium py-2 text-lg hover:text-red-600 transition-colors ${
                    isActive(item.path) ? "text-red-600" : "text-gray-900"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(item.labelKey)}
                </Link>
              ))}
              <LanguageSwitcher />
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
