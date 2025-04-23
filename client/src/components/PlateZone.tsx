import { useTranslation } from "react-i18next";
import { FoodItem } from "@shared/schema";
import { usePlateBuilder } from "@/hooks/use-plate-builder";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlateZoneProps {
  title: string;
  icon: React.ReactNode;
  category: string;
  items: FoodItem[];
  maxSelections: number;
  weightPerItem: number;
}

const PlateZone: React.FC<PlateZoneProps> = ({ 
  title, 
  icon, 
  category, 
  items, 
  maxSelections,
  weightPerItem
}) => {
  const { t } = useTranslation();
  const { 
    isItemSelected, 
    toggleItemSelection,
    getSelectedCountByCategory
  } = usePlateBuilder();

  const selectedCount = getSelectedCountByCategory(category);

  return (
    <div className="plate-zone bg-white rounded-xl shadow-md p-6 overflow-hidden">
      <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
        {icon}
        {title}
        <span className="text-sm font-normal ml-2 text-gray-500">
          {t("plateBuilder.weight", { weight: weightPerItem })}
        </span>
      </h3>
      
      <div className="space-y-3">
        {items.map((item) => (
          <div 
            key={item.id} 
            className={cn(
              "plate-selection border border-gray-200 rounded-lg p-3 flex items-center cursor-pointer",
              isItemSelected(item.id) && "selected"
            )}
            onClick={() => toggleItemSelection(item)}
          >
            <img 
              src={item.imageUrl} 
              alt={item.name} 
              className="w-16 h-16 rounded-md object-cover mr-3" 
            />
            <div className="flex-1">
              <h4 className="font-medium">
                {item.name}
              </h4>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{item.calories} {t("plateBuilder.cal")}</span>
                <span>${item.price.toFixed(2)}</span>
              </div>
            </div>
            <div className="ml-2 flex items-center justify-center w-6 h-6 border border-gray-300 rounded-full selection-indicator">
              {isItemSelected(item.id) && <Check className="h-4 w-4 text-success" />}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-sm">
        <p className="text-gray-600">
          {t("plateBuilder.selectUpTo", { count: maxSelections })}
        </p>
        <p className="text-sm mt-1 text-primary">
          {selectedCount}/{maxSelections} {t("plateBuilder.selected")}
        </p>
      </div>
    </div>
  );
};

export default PlateZone;
