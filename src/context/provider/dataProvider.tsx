import { useState, ReactNode } from "react";
import dataContext from "../context/dataContext";

import { Item } from "../../types/item";
import { Customer } from "../../types/customer";

export const DataProvider = ({ children }: { children: ReactNode }) => {
 
    const [theme, setTheme] = useState("Main");
    const [itemList, setItemList] = useState<Item[]>([]);
    const [clientList, setClientList] = useState<Customer[]>([]);

  const contextValue = {
    theme,
    setTheme,
  };

  return (
    <dataContext.Provider value={contextValue}>
      {children}
    </dataContext.Provider>
  );
};
