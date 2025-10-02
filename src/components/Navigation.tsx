import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
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
              Home
            </Link>

            <Link
              to="/services"
              className={`nav-link font-medium text-base xl:text-lg hover:text-red-600 transition-colors ${
                isActive("/services") ? "text-red-600" : "text-gray-900"
              }`}
            >
              Our Services
            </Link>

            <Link
              to="/about-us"
              className={`nav-link font-medium text-base xl:text-lg hover:text-red-600 transition-colors ${
                isActive("/about-us") ? "text-red-600" : "text-gray-900"
              }`}
            >
              About Us
            </Link>

            <Link
              to="/blog"
              className={`nav-link font-medium text-base xl:text-lg hover:text-red-600 transition-colors ${
                isActive("/blog") ? "text-red-600" : "text-gray-900"
              }`}
            >
              News
            </Link>

            <Link
              to="/advantages"
              className={`nav-link font-medium text-base xl:text-lg hover:text-red-600 transition-colors ${
                isActive("/advantages") ? "text-red-600" : "text-gray-900"
              }`}
            >
              Advantage
            </Link>

            <Link
              to="/global-presence"
              className={`nav-link font-medium text-base xl:text-lg hover:text-red-600 transition-colors ${
                isActive("/global-presence") ? "text-red-600" : "text-gray-900"
              }`}
            >
              Global Presence
            </Link>

            <Link
              to="/contact"
              className={`nav-link font-medium text-base xl:text-lg hover:text-red-600 transition-colors ${
                isActive("/contact") ? "text-red-600" : "text-gray-900"
              }`}
            >
              Contact Us
            </Link>

            <Button className="bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-md">
              中文 / EN
            </Button>
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
                { label: "Home", path: "/" },
                { label: "Our Services", path: "/services" },
                { label: "About Us", path: "/about-us" },
                { label: "News", path: "/blog" },
                { label: "Advantage", path: "/advantages" },
                { label: "Global Presence", path: "/global-presence" },
                { label: "Contact Us", path: "/contact" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-medium py-2 text-lg hover:text-red-600 transition-colors ${
                    isActive(item.path) ? "text-red-600" : "text-gray-900"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button className="bg-gray-100 hover:bg-gray-200 text-gray-900 w-full rounded-md mt-4">
                中文 / EN
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
