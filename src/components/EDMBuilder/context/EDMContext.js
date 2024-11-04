
import React, { createContext, useContext } from 'react';

const EDMContext = createContext();

export const Provider = ({ children, value }) => (
  <EDMContext.Provider value={value}>
    {children}
  </EDMContext.Provider>
);

export const useEDM = () => {
  const context = useContext(EDMContext);
  if (!context) {
    throw new Error('useEDM must be used within an EDMProvider');
  }
  return context;
};