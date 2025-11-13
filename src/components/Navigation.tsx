// src/components/Navigation.tsx
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isHome = location.pathname === "/";

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Sustainability", href: "/sustainability" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-10" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`
                text-sm font-medium transition-colors
                ${isHome ? "text-white" : "text-black"}
                hover:text-red-600
              `}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile button */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileOpen(true)}
        >
          <Menu className={isHome ? "text-white" : "text-black"} />
        </button>

        {/* Mobile nav */}
        {isMobileOpen && (
          <div className="fixed inset-0 bg-white flex flex-col p-6 gap-4">
            <button
              className="self-end"
              onClick={() => setIsMobileOpen(false)}
            >
              <X className="text-black" />
            </button>

            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsMobileOpen(false)}
                className="text-lg font-medium text-black hover:text-red-600"
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
