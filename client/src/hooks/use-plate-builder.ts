import { useContext } from 'react';
import { PlateBuilderContext, PlateBuilderContextType } from '@/context/PlateBuilderContext';

export function usePlateBuilder(): PlateBuilderContextType {
  const context = useContext(PlateBuilderContext);
  
  if (!context) {
    throw new Error('usePlateBuilder must be used within a PlateBuilderProvider');
  }
  
  return context;
}
