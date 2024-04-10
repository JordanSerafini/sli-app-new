import { useEffect, useMemo, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setCustomers } from "../../store/features/customerSlice";
import { Customer } from "../../types/customer";

import Icon from "../../component/svg/Icon";

interface FetchCustomersResponse {
  rows: Customer[];
}

function DevisPage() {
  const dispatch = useAppDispatch();
  const customers = useAppSelector((state) => state.customers.customers);
  const [client, setClient] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const options = useMemo(
    () => ({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    }),
    []
  );

  const { data, isLoading } = useFetch<FetchCustomersResponse>(
    "/getAllCustomer",
    options
  );

  useEffect(() => {
    if (data) {
      dispatch(setCustomers(data.rows));
    }
  }, [data, dispatch]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClient = customers.find(
      (customer) => customer.id?.toString() === event.target.value
    );
    setClient(selectedClient || null);
    // Mettre à jour searchTerm avec le nom du client sélectionné pour l'afficher dans l'input.
    setSearchTerm(selectedClient ? selectedClient.name ?? "" : "");
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    // Réinitialiser la sélection du client lorsque l'utilisateur commence à taper.
    if (client) setClient(null);
  };

  // Filtrer les clients basé sur le terme de recherche
  const filteredCustomers = customers.filter((customer) =>
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        Loading...
      </div>
    );
  }
  const dailyDate = new Date();
  const dateString = dailyDate.toISOString().split("T")[0];


  return (
    <div className="w-screen h-screen flex flex-col items-center pt-2 text-dark-light">
      <div className=" w-9.5/10 ">
        {/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
        <div className="flex flex-row">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Nom du client"
            className="p-2 border border-gray-200 text-center w-9/10"
          />
          <select
            onChange={handleSelectChange}
            value={client?.id ?? ""}
            className="p-2 border border-gray-200 ml-2 w-1/10 h-1  rounded-full items-center"
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
        <div className="text-sm flex items-center gap-2">
            < Icon type="Calendar_Month" theme="red" className="w-4 h-4 mr-2" />
         {dateString}
        </div>
      </div>
    </div>
  );
}

export default DevisPage;
