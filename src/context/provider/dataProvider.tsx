import { useState, ReactNode, useCallback } from "react";
import dataContext from "../context/dataContext";
import Toast from "../../component/toast/toast";

import { Item } from "../../types/item";
import { Customer } from "../../types/customer";
import { StockDocument, StockDocumentLineWithPrice } from "../../types/stockDoc";

export const DataProvider = ({ children }: { children: ReactNode }) => {
 
    const [theme, setTheme] = useState("Main");
    const [itemList, setItemList] = useState<Item[]>([]);
    const [customerList, setCustomerList] = useState<Customer[]>([]);
    const [stockDocs, setStockDocs] = useState<StockDocument[]>([]);
    const [stockDocLines, setStockDocLines] = useState<StockDocumentLineWithPrice[]>([]); 
    const [position, setPosition] = useState("top");
    const [css, setCss] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [message, setMessage] = useState("")
    const [isVisible, setIsVisible] = useState(false)

    // Dans votre DataProvider
    const showToast = useCallback((message: string, timer: number = 3000, position: string = "", css="") => {
      setMessage(message);
      setIsVisible(true);
      setPosition(position);
      setCss(css);
      setTimeout(() => setIsVisible(false), timer);
    }, []);
    
    


  const contextValue = {
    theme,
    setTheme,
    itemList,
    setItemList,
    customerList,
    setCustomerList,
    showToast,
    message,
    isVisible,
    position,
    isLoggedIn,
    setIsLoggedIn,
    stockDocs,
    setStockDocs,
    stockDocLines,
    setStockDocLines,

  };

  return (
    <dataContext.Provider value={contextValue}>
      {children}
      {isVisible && <Toast message={message} onClose={() => setIsVisible(false)} position={position} css={css} />}
    </dataContext.Provider>
  );
};
