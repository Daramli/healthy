import { useTranslation } from "react-i18next";
import { usePlateBuilder } from "@/hooks/use-plate-builder";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const NutritionSummary = () => {
  const { t } = useTranslation();
  const { 
    selectedItems, 
    totalCalories, 
    totalProtein, 
    totalCarbs, 
    totalFat, 
    subtotal, 
    tax, 
    totalPrice, 
    resetSelections
  } = usePlateBuilder();

  const { toast } = useToast();

  const orderPlate = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/plate-orders", {
        selections: selectedItems.map(item => item.id),
        totalCalories,
        totalPrice
      });
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your plate order has been placed.",
        variant: "default"
      });
      queryClient.invalidateQueries({ queryKey: ['/api/plate-orders'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to place your order. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleOrderPlate = () => {
    if (selectedItems.length === 0) {
      toast({
        title: "No items selected",
        description: "Please select at least one item to order.",
        variant: "destructive"
      });
      return;
    }
    orderPlate.mutate();
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
      <h3 className="text-xl font-bold text-primary mb-4">
        {t("plateBuilder.yourPlateSummary")}
      </h3>
      
      {/* Visual representation of the plate */}
      <div className="relative w-full aspect-square rounded-full border-4 border-primary mb-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-green-100 flex items-center justify-center">
          <span className="text-xs font-medium text-green-800">
            {t("plateBuilder.saladZone")}
          </span>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-red-100 flex items-center justify-center">
          <span className="text-xs font-medium text-red-800">
            {t("plateBuilder.fruitZone")}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-yellow-100 flex items-center justify-center">
          <span className="text-xs font-medium text-yellow-800">
            {t("plateBuilder.proteinZone")}
          </span>
        </div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-blue-100 flex items-center justify-center">
          <span className="text-xs font-medium text-blue-800">
            {t("plateBuilder.carbZone")}
          </span>
        </div>
      </div>
      
      {/* Selected Items */}
      <div className="mb-6 space-y-2">
        <h4 className="font-bold text-gray-700">
          {t("plateBuilder.selectedItems")}
        </h4>
        <div className="text-sm text-gray-600 italic">
          {selectedItems.length > 0 
            ? selectedItems.map(item => item.name).join(", ") 
            : t("plateBuilder.noItemsSelected")
          }
        </div>
      </div>
      
      {/* Nutritional information */}
      <div className="mb-6">
        <h4 className="font-bold text-gray-700 mb-2">
          {t("plateBuilder.nutritionalInfo")}
        </h4>
        <div className="space-y-2 nutritional-info">
          <div className="flex justify-between">
            <span className="text-gray-600">
              {t("plateBuilder.calories")}:
            </span>
            <span className="font-medium">{totalCalories} {t("plateBuilder.cal")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">
              {t("plateBuilder.protein")}:
            </span>
            <span className="font-medium">{totalProtein.toFixed(1)}{t("plateBuilder.g")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">
              {t("plateBuilder.carbs")}:
            </span>
            <span className="font-medium">{totalCarbs.toFixed(1)}{t("plateBuilder.g")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">
              {t("plateBuilder.fat")}:
            </span>
            <span className="font-medium">{totalFat.toFixed(1)}{t("plateBuilder.g")}</span>
          </div>
        </div>
      </div>
      
      {/* Price summary */}
      <div className="mb-6">
        <h4 className="font-bold text-gray-700 mb-2">
          {t("plateBuilder.priceSummary")}
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">
              {t("plateBuilder.subtotal")}:
            </span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">
              {t("plateBuilder.tax")}:
            </span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-primary">
            <span>
              {t("plateBuilder.total")}:
            </span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {/* Action buttons */}
      <Button 
        className="w-full bg-primary hover:bg-accent text-white py-3 font-medium"
        onClick={handleOrderPlate}
        disabled={orderPlate.isPending}
      >
        {orderPlate.isPending ? t("loading") : t("plateBuilder.orderPlate")}
      </Button>
      
      <Button 
        variant="outline"
        className="w-full mt-3 border border-primary text-primary hover:bg-primary hover:text-white py-2 font-medium"
        onClick={resetSelections}
      >
        {t("plateBuilder.resetSelections")}
      </Button>
    </div>
  );
};

export default NutritionSummary;
