import { createContext, Dispatch, SetStateAction } from "react";
import { Customer } from "../../types/customer";
import { Item } from "../../types/item";
import { StockDocument } from "../../types/stockDoc";

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
  stockDocs?: StockDocument[];
  setStockDocs?: Dispatch<SetStateAction<StockDocument[]>>;

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
  stockDocs: [],
  setStockDocs: () => {},
});

export default dataContext;
