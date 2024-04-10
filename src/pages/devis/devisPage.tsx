import { useEffect, useMemo, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setCustomers } from "../../store/features/customerSlice";
import { Customer } from "../../types/customer";

import Icon from "../../component/svg/Icon";
import DevisHeader from "../../component/nav/headers/devisHeader";
import { Item } from "../../types/item";
import { setItems } from "../../store/features/itemSlice";

interface FetchCustomersResponse {
  rows: Customer[];
}

interface FectchItemsResponse {
  rows: Item[];
}

function DevisPage() {
  const dispatch = useAppDispatch();
  const customers = useAppSelector((state) => state.customers.customers);
  const items = useAppSelector((state) => state.items.items);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [itemSearchTerm, setItemSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
  const { data: itemsData } = useFetch<FectchItemsResponse>(
    "/getAllitem",
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
    if (newSelectedCustomer) setSearchTerm(newSelectedCustomer.name ?? "");
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoadingCustomers) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        Loading...
      </div>
    );
  }
  // Gestionnaire d'événements pour le champ de recherche d'items.
  const handleItemSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event.target.value);
    setItemSearchTerm(event.target.value);
  }; // Gestionnaire d'événements pour la sélection d'un item.
  const handleItemSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newItem = items.find(
      (item) => item.id?.toString() === event.target.value
    );
    setSelectedItems(newItem ? [newItem] : []);

    setItemSearchTerm(newItem ? newItem.caption : "");
  };
  

  // Filtrage des items basé sur le terme de recherche.
  const filteredItems = items.filter((item) =>
    item.caption?.toLowerCase().includes(itemSearchTerm.toLowerCase())
  );

  const todayDateString = new Date().toISOString().split("T")[0];

  const handleAddItem = () => {
    if (selectedItems.length > 0) {
      console.log(selectedItems);
    }
  };


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
        {/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
        <div className="h-full w-full flex flex-col gap-2">
          <div className="bg-white h-9/10 w-10/10 overflow-auto"></div>
          <div className="flex flex-row">
            <input
              type="text"
              value={itemSearchTerm}
              onChange={handleItemSearchChange}
              placeholder="Rechercher un item"
              className="p-2 border rounded-2xl border-gray-200 text-center w-full hover:border-blue-secondary focus:border-blue-secondary focus:outline-none text-"
            />
            <select
                onChange={handleItemSelectChange}
                value={selectedItems.length > 0 ? selectedItems[0].id ?? "" : ""}
                className="p-2 border border-gray-200 ml-2 w-1 h-1  rounded-full items-center"
                >
                <option value="">Sélectionner un item</option>
                {filteredItems.map((item, index) => (
                    <option key={item.caption + index} value={item.caption ?? ""}>
                      {item.caption} - {item.salepricevatincluded} €
                    </option>
                ))}
            </select>
            <button onClick={handleAddItem}>+</button>
          </div>
        </div>

        {/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
        {/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      </div>
    </div>
  );
}

export default DevisPage;
