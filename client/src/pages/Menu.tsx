import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Meal } from "@shared/schema";
import ItemCard from "@/components/ItemCard";
import { Button } from "@/components/ui/button";

const Menu = () => {
  const { t } = useTranslation();
  
  const { data: meals, isLoading, error } = useQuery<Meal[]>({
    queryKey: ['/api/meals'],
  });

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-3">
            {t("menu.title")}
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            {t("menu.subtitle")}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {meals?.map((meal) => (
              <ItemCard
                key={meal.id}
                type="meal"
                item={meal}
              />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Button
            className="bg-primary hover:bg-accent text-white px-8 py-3 rounded-lg font-medium transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {t("plateBuilder.title")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Menu;
