import { useEffect, useMemo, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setCustomers } from "../../store/features/customerSlice";
import { setItems } from "../../store/features/itemSlice";
import { Customer } from "../../types/customer";
import Icon from "../svg/Icon";
import DevisHeader from "../nav/headers/devisHeader";
import { Item } from "../../types/item";

// Assurez-vous que les interfaces sont correctes
interface FetchCustomersResponse {
  rows: Customer[];
}

interface FetchItemsResponse {
  rows: Item[];
}

interface DevisLine {
  id: number;
  line: {
    caption: string;
    salepricevatincluded: number;
    quantity: number;
  };
}

function DevisPage() {
  const dispatch = useAppDispatch();
  const customers = useAppSelector((state) => state.customers.customers);
  const items = useAppSelector((state) => state.items.items);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [searchItem, setSearchItem] = useState("");

  const [devisLines, setDevisLines] = useState<DevisLine[]>([
    
  ]);

  const todayDateString = new Date().toISOString().split("T")[0];
  const fetchOptions = useMemo(
    () => ({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    }),
    []
  );

  const { data: customersData, isLoading: isLoadingCustomers } =
    useFetch<FetchCustomersResponse>("/getAllCustomer", fetchOptions);
  const { data: itemsData } = useFetch<FetchItemsResponse>(
    "/getAllItem",
    fetchOptions
  );

  useEffect(() => {
    if (itemsData) dispatch(setItems(itemsData.rows));
    if (customersData) dispatch(setCustomers(customersData.rows));
  }, [itemsData, customersData, dispatch]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedCustomer = customers.find(
      (customer) => customer.id?.toString() === event.target.value
    );
    setSelectedCustomer(newSelectedCustomer || null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectItemChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSelectedItem = items.find(
      (item) => item.id?.toString() === event.target.value
    );
    setSearchItem(newSelectedItem?.id || "");
  };

  const handleItemSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchItem(event.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.caption?.toLowerCase().includes(searchItem.toLowerCase())
  );

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };


  const addDevisLine = () => {
  console.log("selectedItem:", selectedItem);
    const newDevisLine = {
      id: devisLines.length + 1,
      line: {
        caption: selectedItem?.caption || "", 
        salepricevatincluded: selectedItem?.salepricevatincluded || 0,
        quantity: quantity,
      },
    };
  
    console.log("newDevisLine:", newDevisLine);
  
    setDevisLines([...devisLines, newDevisLine]);
  };
  


  if (isLoadingCustomers) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        Loading...
      </div>
    );
  }
  return (
    <div className="w-screen h-screen flex flex-col items-center text-dark-light">
      <DevisHeader />
      <div className=" w-9.5/10 h-full flex flex-col gap-4 pt-20">
        {/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
        <div className="flex flex-row">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Nom du client"
            className="p-2 border rounded-2xl border-gray-200 text-center w-10/10 hover:border-blue-secondary focus:border-blue-secondary focus:outline-none text-primary"
          />
          <select
            onChange={handleSelectChange}
            value={selectedCustomer?.id ?? ""}
            className="p-2 border border-gray-200 ml-2 w-1 h-1  rounded-full items-center"
          >
            <option value=""></option>
            {filteredCustomers.map((customer) => (
              <option key={customer.id} value={customer.id ?? ""}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        {/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
        <div className="flex flex-row w-full justify-between pt-2">
          <div className="text-sm flex items-center gap-2 flex-row">
            <Icon type="Calendar_Month" theme="" className="w-4 h-4 mr-2" />
            <p className="">{todayDateString}</p>
          </div>
          <div className="text-sm flex items-center gap-2 flex-row">
            <Icon type="account_circle" theme="" className="w-4 h-4 mr-2" />
            <div>Pascal R.</div>
          </div>
        </div>
        {/*--------------------------------------------------------------------- ITEMS ------------------------------------------------------------------------------------------------*/}
        {/* Item Selector */}
        <div className="h-full w-full flex flex-col gap-2">
          {/*--------------------------------------------------------------------- TABLEAU ------------------------------------------------------------------------------------------------*/}

          <div className="min-h-7/10 bg-white">
            {devisLines.map((Line) => (
              <div key={Line.id} className="flex flex-row gap-2">
                {Line.line.quantity} x {Line.line.caption} -{" "}
              </div>
            ))}
          </div>
          {/*--------------------------------------------------------------------- INPUT SELECT ------------------------------------------------------------------------------------------------*/}

          <div className="flex flex-row w-10/10 gap-2">
            <select
              onChange={handleSelectItemChange}
              value={selectedItem?.id ?? ""}
              className="p-2 border border-gray-200 ml-2 w-1 h-1 rounded-full items-center"
            >
              <option value="">Sélectionner un item</option>
              {filteredItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.caption} - {item.salepricevatincluded} €
                </option>
              ))}
            </select>
            <input
              type="text"
              value={searchItem}
              onChange={handleItemSearchChange}
              placeholder="Rechercher un item"
              className="p-2 border rounded-2xl border-gray-200 text-center w- hover:border-blue-secondary focus:border-blue-secondary focus:outline-none"
            />
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1" 
              className="border rounded-2xl p-2 w-1/10 text-center"
            />
            <button onClick={addDevisLine}>Valider</button>
          </div>
        </div>

        {/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
        {/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      </div>
    </div>
  );
}

export default DevisPage;
