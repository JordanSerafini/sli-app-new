import { useState, ReactNode, useCallback } from "react";
import dataContext from "../context/dataContext";
import Toast from "../../component/toast/toast";

import { Item } from "../../types/item";
import { Customer } from "../../types/customer";

export const DataProvider = ({ children }: { children: ReactNode }) => {
 
    const [theme, setTheme] = useState("Main");
    const [itemList, setItemList] = useState<Item[]>([]);
    const [customerList, setCustomerList] = useState<Customer[]>([]);
    const [position, setPosition] = useState("top");
    const [css, setCss] = useState("");

    const [message, setMessage] = useState("")
    const [isVisible, setIsVisible] = useState(false)

    // Dans votre DataProvider
    const showToast = useCallback((message: string, timer: number = 3000, position: string = "bottom", css="") => {
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

  };

  return (
    <dataContext.Provider value={contextValue}>
      {children}
      {isVisible && <Toast message={message} onClose={() => setIsVisible(false)} position={position} css={css} />}
    </dataContext.Provider>
  );
};
