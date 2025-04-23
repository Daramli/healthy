import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { MobileMenu } from "./ui/mobile-menu";
import { LanguageToggle } from "./ui/language-toggle";
import { Button } from "./ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/plate-builder", label: t("nav.plateBuilder") },
    { href: "/menu", label: t("nav.menu") },
    { href: "/products", label: t("nav.products") },
    { href: "/plans", label: t("nav.plans") },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo and Title */}
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-primary mr-3 flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-8 w-8"
              >
                <path d="M11 4c0 5-4 5-4 10a4 4 0 1 0 8 0c0-5-4-5-4-10" />
                <path d="M14 15c2.2 0 4-1.8 4-4" />
                <path d="M17 11V4" />
              </svg>
            </div>
            <div>
              <h1 className="text-primary text-2xl font-bold">
                {t("appName")}
              </h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8 ltr:space-x-8 rtl:space-x-reverse">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className={`font-medium ${location === item.href ? 'text-accent' : 'text-primary'} hover:text-accent transition-colors`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4 ltr:space-x-4 rtl:space-x-reverse">
            <LanguageToggle />
            <a 
              href="https://wa.me/1234567890" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-success text-white px-3 py-2 rounded-full flex items-center hover:bg-opacity-90 transition-colors"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                width="16" 
                height="16" 
                fill="currentColor" 
                viewBox="0 0 16 16"
                className="mr-1"
              >
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
              </svg>
              {t("nav.orderNow")}
            </a>
            <button 
              id="mobile-menu-button" 
              className="md:hidden text-primary"
              onClick={toggleMenu}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu isOpen={isMenuOpen} items={navItems} />
      </div>
    </header>
  );
};

export default Header;
