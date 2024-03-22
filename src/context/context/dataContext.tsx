import { createContext, Dispatch, SetStateAction } from "react";
import { Customer } from "../../types/customer";
import { Item } from "../../types/item";
import { StockDocument, StockDocumentLineWithPrice } from "../../types/stockDoc";

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
  stockDocLines?: StockDocumentLineWithPrice[];
  setStockDocLines?: Dispatch<SetStateAction<StockDocumentLineWithPrice[]>>;

}

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
  stockDocLines: [],
  setStockDocLines: () => {},
});

export default dataContext;
