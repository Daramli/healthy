import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const CorporateOffers = () => {
  const { t } = useTranslation();

  return (
    <section id="corporate" className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary to-accent rounded-2xl overflow-hidden shadow-xl">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12 text-white">
              <h2 className="text-3xl font-bold mb-4">
                {t("corporate.title")}
              </h2>
              <p className="text-lg mb-6 text-white text-opacity-90">
                {t("corporate.subtitle")}
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-white" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" 
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">
                      {t("corporate.mealPrograms")}
                    </h3>
                    <p className="text-sm text-white text-opacity-80">
                      {t("corporate.mealProgramsDesc")}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-white" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">
                      {t("corporate.wellnessWorkshops")}
                    </h3>
                    <p className="text-sm text-white text-opacity-80">
                      {t("corporate.wellnessWorkshopsDesc")}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-white" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" 
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">
                      {t("corporate.teamChallenges")}
                    </h3>
                    <p className="text-sm text-white text-opacity-80">
                      {t("corporate.teamChallengesDesc")}
                    </p>
                  </div>
                </div>
              </div>
              
              <Button className="bg-white text-primary hover:bg-opacity-90 px-6 py-3">
                {t("corporate.requestPackage")}
              </Button>
            </div>
            
            <div className="md:w-1/2 relative">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop" 
                alt="Corporate wellness" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorporateOffers;
