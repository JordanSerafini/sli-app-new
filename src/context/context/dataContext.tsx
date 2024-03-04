import { createContext, Dispatch, SetStateAction } from "react";

// Définir le type pour les valeurs du contexte
interface DataContextType {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

// Créer le contexte avec une valeur initiale
const dataContext = createContext<DataContextType>({
  theme: "Main", 
  setTheme: () => {}, 
});

export default dataContext;
