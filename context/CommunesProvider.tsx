import React, { ReactNode, createContext, useState } from 'react';

// Define the CommunesContext
interface CommunesContextType {
  communes: string[];
  getCommunes: () => void;
}

// Create the CommunesContext
export const CommunesContext = createContext<CommunesContextType>({
  communes: [],
  addCommune: () => {},
});

// Create the CommunesProvider component
const CommunesProvider = ({ children }: { children: ReactNode }) => {
  const [communes, setCommunes] = useState<string[]>([]);

  const addCommune = (commune: string) => {
    setCommunes((prevCommunes) => [...prevCommunes, commune]);
  };

  return <CommunesContext.Provider value={{ communes, addCommune }}>{children}</CommunesContext.Provider>;
};

export default CommunesProvider;
