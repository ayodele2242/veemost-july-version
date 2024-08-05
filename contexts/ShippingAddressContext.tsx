"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ShippingAddressContextType {
  isAddressSelected: boolean;
  setAddressSelected: (selected: boolean) => void;
}

const ShippingAddressContext = createContext<ShippingAddressContextType | undefined>(undefined);

export const ShippingAddressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAddressSelected, setAddressSelected] = useState<boolean>(false);

  return (
    <ShippingAddressContext.Provider value={{ isAddressSelected, setAddressSelected }}>
      {children}
    </ShippingAddressContext.Provider>
  );
};

export const useShippingAddress = () => {
  const context = useContext(ShippingAddressContext);
  if (context === undefined) {
    throw new Error('useShippingAddress must be used within a ShippingAddressProvider');
  }
  return context;
};
