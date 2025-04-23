import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { FoodItem } from "@shared/schema";
import PlateZone from "@/components/PlateZone";
import NutritionSummary from "@/components/NutritionSummary";
import { Leaf, Apple, Drumstick, Sandwich } from "lucide-react";

const PlateBuilder = () => {
  const { t } = useTranslation();
  
  const { data: saladItems, isLoading: isLoadingSalad } = useQuery<FoodItem[]>({
    queryKey: ['/api/food-items/category/salad'],
  });
  
  const { data: fruitItems, isLoading: isLoadingFruit } = useQuery<FoodItem[]>({
    queryKey: ['/api/food-items/category/fruit'],
  });
  
  const { data: proteinItems, isLoading: isLoadingProtein } = useQuery<FoodItem[]>({
    queryKey: ['/api/food-items/category/protein'],
  });
  
  const { data: carbItems, isLoading: isLoadingCarb } = useQuery<FoodItem[]>({
    queryKey: ['/api/food-items/category/carb'],
  });
  
  const isLoading = isLoadingSalad || isLoadingFruit || isLoadingProtein || isLoadingCarb;

  return (
    <section id="plate-builder" className="py-16 bg-secondary bg-opacity-30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-3">
            {t("plateBuilder.title")}
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            {t("plateBuilder.subtitle")}
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-lg">{t("loading")}</p>
          </div>
        ) : (
          <div className="plate-builder-container flex flex-wrap md:flex-nowrap gap-6">
            {/* Left side - Plate Zones */}
            <div className="w-full md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Salad Zone */}
                <PlateZone
                  title={t("plateBuilder.saladZone")}
                  icon={<Leaf className="h-5 w-5 text-success mr-2" />}
                  category="salad"
                  items={saladItems || []}
                  maxSelections={3}
                  weightPerItem={30}
                />

                {/* Fruit Zone */}
                <PlateZone
                  title={t("plateBuilder.fruitZone")}
                  icon={<Apple className="h-5 w-5 text-success mr-2" />}
                  category="fruit"
                  items={fruitItems || []}
                  maxSelections={3}
                  weightPerItem={30}
                />

                {/* Protein Zone */}
                <PlateZone
                  title={t("plateBuilder.proteinZone")}
                  icon={<Drumstick className="h-5 w-5 text-success mr-2" />}
                  category="protein"
                  items={proteinItems || []}
                  maxSelections={5}
                  weightPerItem={100}
                />

                {/* Carb Zone */}
                <PlateZone
                  title={t("plateBuilder.carbZone")}
                  icon={<Sandwich className="h-5 w-5 text-success mr-2" />}
                  category="carb"
                  items={carbItems || []}
                  maxSelections={3}
                  weightPerItem={100}
                />
              </div>
            </div>
            
            {/* Right side - Nutrition Summary */}
            <div className="w-full md:w-1/3">
              <NutritionSummary />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PlateBuilder;
