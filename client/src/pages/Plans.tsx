import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Plan } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const Plans = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const { data: plans, isLoading, error } = useQuery<Plan[]>({
    queryKey: ['/api/plans'],
  });

  const handleSubscribe = (planName: string) => {
    toast({
      title: "Subscription Started",
      description: `You've subscribed to the ${planName} plan.`,
    });
  };

  return (
    <section className="py-16 bg-secondary bg-opacity-30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-3">
            {t("plans.title")}
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            {t("plans.subtitle")}
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-lg">{t("loading")}</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-lg text-red-500">{t("error")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans?.map((plan) => (
              <div 
                key={plan.id} 
                className={cn(
                  "bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 border-t-4",
                  plan.isPopular ? "border-accent transform scale-105 z-10 shadow-lg" : "border-primary"
                )}
              >
                {plan.isPopular && (
                  <div className="bg-accent text-white py-2 text-center font-medium">
                    {t("plans.mostPopular")}
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    {t('en') === 'en' ? plan.name : plan.nameAr}
                  </h3>
                  <div className="flex items-end mb-6">
                    <span className="text-4xl font-bold text-accent">${plan.price}</span>
                    <span className="text-gray-600 ml-1">
                      {t("plans.perMonth")}
                    </span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {Array.isArray(plan.features) && plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        {feature.included ? (
                          <Check className="text-success mr-3 h-5 w-5" />
                        ) : (
                          <X className="text-gray-400 mr-3 h-5 w-5" />
                        )}
                        <span className={cn(
                          feature.included ? "" : "text-gray-400",
                          t('en') === 'en' ? "" : ""
                        )}>
                          {t('en') === 'en' ? feature.name : feature.nameAr}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={cn(
                      "w-full py-3 rounded-lg font-medium transition-colors",
                      plan.isPopular 
                        ? "bg-accent hover:bg-primary text-white" 
                        : "bg-primary hover:bg-accent text-white"
                    )}
                    onClick={() => handleSubscribe(t('en') === 'en' ? plan.name : plan.nameAr)}
                  >
                    {t("plans.subscribeNow")}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Plans;
