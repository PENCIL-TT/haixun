import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  const isHome = location.pathname === "/";

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Sustainability", href: "/sustainability" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/">
        <img src="/logo.png" className="h-10" />
      </Link>

      {/* Desktop Menu */}
      <nav className="hidden md:flex gap-8">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`
              transition font-medium
              ${isHome ? "text-white" : "text-black"}
              hover:text-red-600
            `}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Mobile Button */}
      <button className="md:hidden" onClick={() => setIsMobile(true)}>
        <Menu className={`${isHome ? "text-white" : "text-black"}`} />
      </button>

      {/* Mobile Menu */}
      {isMobile && (
        <div className="fixed inset-0 bg-white p-6 flex flex-col gap-4">
          <button onClick={() => setIsMobile(false)}>
            <X className="text-black" />
          </button>

          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setIsMobile(false)}
              className="text-black text-lg font-medium hover:text-red-600"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
