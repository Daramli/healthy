import { createContext, ReactNode, useState, useCallback, useMemo } from 'react';
import { FoodItem } from '@shared/schema';

export interface PlateBuilderContextType {
  selectedItems: FoodItem[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  subtotal: number;
  tax: number;
  totalPrice: number;
  toggleItemSelection: (item: FoodItem) => void;
  isItemSelected: (id: number) => boolean;
  getSelectedCountByCategory: (category: string) => number;
  resetSelections: () => void;
}

export const PlateBuilderContext = createContext<PlateBuilderContextType | null>(null);

interface PlateBuilderProviderProps {
  children: ReactNode;
}

export const PlateBuilderProvider = ({ children }: PlateBuilderProviderProps) => {
  const [selectedItems, setSelectedItems] = useState<FoodItem[]>([]);
  
  const isItemSelected = useCallback((id: number) => {
    return selectedItems.some(item => item.id === id);
  }, [selectedItems]);
  
  const getSelectedCountByCategory = useCallback((category: string) => {
    return selectedItems.filter(item => item.category === category).length;
  }, [selectedItems]);
  
  const toggleItemSelection = useCallback((item: FoodItem) => {
    if (isItemSelected(item.id)) {
      // Remove item if already selected
      setSelectedItems(prev => prev.filter(i => i.id !== item.id));
    } else {
      // Check max selections per category
      const maxSelections = {
        salad: 3,
        fruit: 3,
        protein: 5,
        carb: 3
      };
      
      const currentSelections = getSelectedCountByCategory(item.category);
      const maxForCategory = maxSelections[item.category as keyof typeof maxSelections] || 0;
      
      if (currentSelections < maxForCategory) {
        setSelectedItems(prev => [...prev, item]);
      } else {
        // Max selections reached for this category
        // This would be a good place to show a toast notification
        console.warn(`Maximum of ${maxForCategory} items can be selected from ${item.category} zone`);
      }
    }
  }, [isItemSelected, getSelectedCountByCategory]);
  
  const resetSelections = useCallback(() => {
    setSelectedItems([]);
  }, []);
  
  // Calculate nutritional values and prices
  const calculations = useMemo(() => {
    const totalCalories = selectedItems.reduce((sum, item) => sum + item.calories, 0);
    const totalProtein = selectedItems.reduce((sum, item) => sum + item.protein, 0);
    const totalCarbs = selectedItems.reduce((sum, item) => sum + item.carbs, 0);
    const totalFat = selectedItems.reduce((sum, item) => sum + item.fat, 0);
    
    const subtotal = selectedItems.reduce((sum, item) => sum + item.price, 0);
    const tax = subtotal * 0.1; // 10% tax
    const totalPrice = subtotal + tax;
    
    return {
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
      subtotal,
      tax,
      totalPrice
    };
  }, [selectedItems]);
  
  const contextValue: PlateBuilderContextType = {
    selectedItems,
    ...calculations,
    toggleItemSelection,
    isItemSelected,
    getSelectedCountByCategory,
    resetSelections
  };
  
  return (
    <PlateBuilderContext.Provider value={contextValue}>
      {children}
    </PlateBuilderContext.Provider>
  );
};
