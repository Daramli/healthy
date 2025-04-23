import { useTranslation } from "react-i18next";
import { Link } from "wouter";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className="bg-gradient-to-r from-primary to-accent text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl font-bold mb-4">
              {t("hero.title")}
            </h1>
            <p className="text-lg mb-6">
              {t("hero.subtitle")}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <Link 
                href="/plate-builder"
                className="bg-white text-primary px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors"
              >
                {t("hero.startBuilding")}
              </Link>
              <Link 
                href="/menu"
                className="border border-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-primary transition-colors"
              >
                {t("hero.browseMenu")}
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop" 
              alt="Healthy meal plate" 
              className="rounded-lg shadow-lg w-full h-auto max-h-96 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
