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
        
        const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
        const [searchTerm, setSearchTerm] = useState('');
      
        const fetchOptions = useMemo(() => ({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
          },
        }), []);
      
        const { data: customersData, isLoading: isLoadingCustomers } = useFetch<FetchCustomersResponse>('/getAllCustomer', fetchOptions);
        const { data: itemsData } = useFetch<FectchItemsResponse>('/getAllitem', fetchOptions);
      
        useEffect(() => {
          if (itemsData) dispatch(setItems(itemsData.rows));
          if (customersData) dispatch(setCustomers(customersData.rows));
        }, [itemsData, customersData, dispatch]);
      
        const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
          const newSelectedCustomer = customers.find(customer => customer.id?.toString() === event.target.value);
          setSelectedCustomer(newSelectedCustomer || null);
          if (newSelectedCustomer) setSearchTerm(newSelectedCustomer.name ?? '');
        };
      
        const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setSearchTerm(event.target.value);
        };
      
        const filteredCustomers = customers.filter(customer =>
          customer.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
        if (isLoadingCustomers) {
          return <div className="w-screen h-screen flex flex-col items-center justify-center">Loading...</div>;
        }
      
        const todayDateString = new Date().toISOString().split('T')[0];

  return (
    <div className="w-screen h-screen flex flex-col items-center text-dark-light">
      <DevisHeader />
      <div className=" w-9.5/10 flex flex-col gap-2 pt-20">
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
        <div className="flex flex-row w-full justify-between">
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
        <div className="bg-white">
            
        </div>
        
        {/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
        {/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      </div>
    </div>
  );
}

export default DevisPage;
