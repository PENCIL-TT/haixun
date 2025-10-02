import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "@/components/LanguageSwitcher";
import CountrySelector from "@/components/CountrySelector";
import { getCurrentCountryFromPath, detectCountryByIP } from "@/services/countryDetection";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

/** Small flag component that never shows raw text like '/lk.svg' */
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
      alt=""                /* alt intentionally empty so no text shows */
      aria-hidden="true"    /* decorative */
      className={className}
      draggable={false}
      onError={(e) => {
        // If missing, hide image (no text fallback ever rendered)
        (e.currentTarget as HTMLImageElement).style.display = "none";
      }}
    />
  );
}

const Navigation = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [ipCountry, setIpCountry] = useState<{ code: string; name: string } | null>(null);
  const location = useLocation();
  const { user } = useAuth();

  // We use the URL to decide the current country flag
  const currentCountry = getCurrentCountryFromPath(location.pathname);

  // Detect country by IP for flag display
  useEffect(() => {
    const detect = async () => {
      try {
        const saved = localStorage.getItem("preferredCountry");
        if (saved) {
          setIpCountry(JSON.parse(saved));
          return;
        }
        const country = await detectCountryByIP();
        setIpCountry({ code: country.code, name: country.name });
      } catch {
        setIpCountry(null);
      }
    };
    detect();
  }, []);
  const isActive = (path: string) => location.pathname === path;

  const getNavLink = (basePath: string) => {
    if (currentCountry.code === "SG") return basePath;
    return `/${currentCountry.name.toLowerCase().replace(" ", "-")}${basePath}`;
  };

  const isCompanyLinkActive = () =>
    isActive(getNavLink("/about-us")) ||
    isActive(getNavLink("/gallery")) ||
    isActive(getNavLink("/career"));

  const SOCIALS = [
    { name: "LinkedIn", href: "https://www.linkedin.com/company/amassmiddleeast/", Icon: FaLinkedinIn },
    { name: "Facebook", href: "https://www.facebook.com/Amassmiddleeast?mibextid=ZbWKwL", Icon: FaFacebookF },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 shadow-md backdrop-blur supports-[backdrop-filter]:backdrop-blur transition-all duration-300 bg-slate-50">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-4 lg:py-[18px]">
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
                isActive("/") ? "text-red-600" : "text-gray-900"
              }`}
            >
              {t('nav.home')}
            </Link>

            <Link
              to="/services"
              className={`nav-link font-medium text-base xl:text-lg hover:text-red-600 transition-colors ${
                isActive("/services") ? "text-red-600" : "text-gray-900"
              }`}
            >
              {t('nav.services')}
            </Link>

            <Link
              to="/about-us"
              className={`nav-link font-medium text-base xl:text-lg hover:text-red-600 transition-colors ${
                isActive("/about-us") ? "text-red-600" : "text-gray-900"
              }`}
            >
              {t('nav.about')}
            </Link>

            <Link
              to="/blog"
              className={`nav-link font-medium text-base xl:text-lg hover:text-red-600 transition-colors ${
                isActive("/blog") ? "text-red-600" : "text-gray-900"
              }`}
            >
              {t('nav.news')}
            </Link>

            <Link
              to="/advantages"
              className={`nav-link font-medium text-base xl:text-lg hover:text-red-600 transition-colors ${
                isActive("/advantages") ? "text-red-600" : "text-gray-900"
              }`}
            >
              {t('nav.advantage')}
            </Link>

            <Link
              to="/global-presence"
              className={`nav-link font-medium text-base xl:text-lg hover:text-red-600 transition-colors ${
                isActive("/global-presence") ? "text-red-600" : "text-gray-900"
              }`}
            >
              {t('nav.globalPresence')}
            </Link>

            <Link
              to="/contact"
              className={`nav-link font-medium text-base xl:text-lg hover:text-red-600 transition-colors ${
                isActive("/contact") ? "text-red-600" : "text-gray-900"
              }`}
            >
              {t('nav.contact')}
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
              {isMenuOpen ? <X className="text-gray-900" size={24} /> : <Menu className="text-gray-900" size={24} />}
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
