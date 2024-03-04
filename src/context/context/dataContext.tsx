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
}

// Créer le contexte avec une valeur initiale
const dataContext = createContext<DataContextType>({
  theme: "Main", 
  setTheme: () => {}, 
  itemList: [],
  setItemList: () => {},
  customerList: [],
  setCustomerList: () => {},
});

export default dataContext;
