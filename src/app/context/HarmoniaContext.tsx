import React, { createContext, useContext, ReactNode } from "react";

interface HarmoniaContext {
  test: string;
}

const HarmoniaContext = createContext<HarmoniaContext | undefined>(undefined);

interface HarmoniaProviderProps {
  children: ReactNode;
}

export const HarmoniaProvider: React.FC<HarmoniaProviderProps> = ({ children }) => {
  const test = "Context works!!!";

  return (
    <HarmoniaContext.Provider value={{ test }}>
      {children}
    </HarmoniaContext.Provider>
  );
};

export const useHarmonia = () => {
  const context = useContext(HarmoniaContext);
  if (!context) {
    throw new Error("useHarmonia must be used within a HarmoniaProvider");
  }
  return context;
};
