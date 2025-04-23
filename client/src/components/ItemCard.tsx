import { useTranslation } from "react-i18next";
import { Meal, Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ItemCardProps {
  type: 'meal' | 'product';
  item: Meal | Product;
}

const ItemCard = ({ type, item }: ItemCardProps) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const currentLanguage = i18n.language;
  
  const handleAddToCart = () => {
    const itemName = currentLanguage === 'ar' 
      ? (item as any).nameAr 
      : (item as any).name;
      
    toast({
      title: "Added to cart",
      description: `${itemName} has been added to your cart.`,
    });
  };

  if (type === 'meal') {
    const meal = item as Meal;
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-1">
        <img 
          src={meal.imageUrl} 
          alt={currentLanguage === 'ar' ? meal.nameAr : meal.name} 
          className="w-full h-48 object-cover" 
        />
        <div className="p-6">
          <h3 className="text-xl font-bold text-primary">
            {currentLanguage === 'ar' ? meal.nameAr : meal.name}
          </h3>
          <p className="text-gray-600 mt-2">
            {currentLanguage === 'ar' ? meal.descriptionAr : meal.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-xs bg-secondary text-primary px-2 py-1 rounded-full">{meal.calories} cal</span>
            <span className="text-xs bg-secondary text-primary px-2 py-1 rounded-full">{meal.protein}g {t("plateBuilder.protein").toLowerCase()}</span>
            <span className="text-xs bg-secondary text-primary px-2 py-1 rounded-full">{meal.carbs}g {t("plateBuilder.carbs").toLowerCase()}</span>
            <span className="text-xs bg-secondary text-primary px-2 py-1 rounded-full">{meal.fat}g {t("plateBuilder.fat").toLowerCase()}</span>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-bold text-primary">${meal.price.toFixed(2)}</span>
            <Button
              className="bg-primary hover:bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              onClick={handleAddToCart}
            >
              {t("menu.addToCart")}
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    const product = item as Product;
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-1">
        <img 
          src={product.imageUrl} 
          alt={currentLanguage === 'ar' ? product.nameAr : product.name} 
          className="w-full h-40 object-cover" 
        />
        <div className="p-4">
          <h3 className="text-lg font-bold text-primary">
            {currentLanguage === 'ar' ? product.nameAr : product.name}
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            {currentLanguage === 'ar' ? product.descriptionAr : product.description}
          </p>
          <div className="flex justify-between items-center mt-3">
            <span className="font-bold text-primary">${product.price.toFixed(2)}</span>
            <Button
              className="bg-primary hover:bg-accent text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors"
              onClick={handleAddToCart}
            >
              {t("products.add")}
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

export default ItemCard;
