import { createContext, Dispatch, SetStateAction } from "react";
import { Customer } from "../../types/customer";
import { Item } from "../../types/item";

// Définir le type pour les valeurs du contexte
interface DataContextType {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  itemList: Item[];
  setItemList: Dispatch<SetStateAction<Item[]>>;
  customerList: Customer[];
  setCustomerList: Dispatch<SetStateAction<Customer[]>>;
  message: string;
  isVisible: boolean;
  showToast: (message: string, timer?: number, position?: string, css?: string) => void; 
  isLoggedIn: boolean;
  setIsLoggedIn?: Dispatch<SetStateAction<boolean>>;
}

// Créer le contexte avec une valeur initiale
const dataContext = createContext<DataContextType>({
  theme: "Main", 
  setTheme: () => {},
  itemList: [],
  setItemList: () => {},
  customerList: [],
  setCustomerList: () => {},
  message: "",
  isVisible: false,
  showToast: () => {}, 
  isLoggedIn: false,
});

export default dataContext;
