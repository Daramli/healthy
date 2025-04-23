import { useTranslation } from "react-i18next";
import { Link } from "wouter";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-white mr-3 flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-6 w-6"
                >
                  <path d="M11 4c0 5-4 5-4 10a4 4 0 1 0 8 0c0-5-4-5-4-10" />
                  <path d="M14 15c2.2 0 4-1.8 4-4" />
                  <path d="M17 11V4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">
                {t("appName")}
              </h2>
            </div>
            <p className="text-white text-opacity-80 mb-4">
              {t("footer.description")}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="text-white hover:text-secondary transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-secondary transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-secondary transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-secondary transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white text-opacity-80 hover:text-opacity-100 transition-colors">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link href="/plate-builder" className="text-white text-opacity-80 hover:text-opacity-100 transition-colors">
                  {t("nav.plateBuilder")}
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-white text-opacity-80 hover:text-opacity-100 transition-colors">
                  {t("nav.menu")}
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-white text-opacity-80 hover:text-opacity-100 transition-colors">
                  {t("nav.products")}
                </Link>
              </li>
              <li>
                <Link href="/plans" className="text-white text-opacity-80 hover:text-opacity-100 transition-colors">
                  {t("nav.plans")}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              {t("footer.contactUs")}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="mr-2 w-5 text-center"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="text-white text-opacity-80">
                  {t("footer.address")}
                </span>
              </li>
              <li className="flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="mr-2 w-5 text-center"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span className="text-white text-opacity-80">+123 456 7890</span>
              </li>
              <li className="flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="mr-2 w-5 text-center"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span className="text-white text-opacity-80">info@healthy.com</span>
              </li>
              <li className="flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="mr-2 w-5 text-center"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span className="text-white text-opacity-80">
                  {t("footer.openHours")}
                </span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              {t("footer.newsletter")}
            </h3>
            <p className="text-white text-opacity-80 mb-4">
              {t("footer.subscribeDesc")}
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder={t("footer.emailPlaceholder")} 
                className="px-4 py-2 rounded-l-lg w-full focus:outline-none text-text" 
                required 
              />
              <button 
                type="submit" 
                className="bg-accent hover:bg-accent text-white px-4 py-2 rounded-r-lg"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
            <div className="mt-4">
              <a 
                href="https://wa.me/1234567890" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-white bg-success rounded-lg px-4 py-2 hover:bg-opacity-90 transition-colors"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg"
                  width="16" 
                  height="16" 
                  fill="currentColor" 
                  viewBox="0 0 16 16"
                  className="mr-2"
                >
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
                {t("footer.whatsappOrder")}
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-white border-opacity-20 mt-8 pt-8 text-center">
          <p className="text-white text-opacity-60">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
