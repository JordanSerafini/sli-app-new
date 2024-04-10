import { useEffect, useMemo, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setCustomers } from "../../store/features/customerSlice";
import { Customer } from "../../types/customer";

interface FetchCustomersResponse {
  rows: Customer[];
}

function DevisPage() {
  const dispatch = useAppDispatch();
  // Utilisation du useSelector pour accéder à l'état des clients.
  const customers = useAppSelector((state) => state.customers.customers);

  // useState pour gérer le client sélectionné.
  const [client, setClient] = useState<Customer | null>(null);

  const options = useMemo(() => ({
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  }), []); 

  // Utilisation de useFetch pour récupérer les données des clients.
  const { data, isLoading } = useFetch<FetchCustomersResponse>("/getAllCustomer", options);

  useEffect(() => {
    // Dispatch des clients récupérés vers le Redux store une fois les données chargées.
    if (data) {
      dispatch(setCustomers(data.rows));
    }
  }, [data, dispatch]);

  // Gestionnaire pour la sélection d'un client
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClient = customers.find(customer => customer.id?.toString() === event.target.value);
    setClient(selectedClient || null);
  };

  //console.log(customers);

  // Condition de chargement intégrée dans le rendu principal pour simplifier.
  if (isLoading) {
    return <div className="w-screen h-screen flex flex-col items-center justify-center">Loading...</div>;
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
     
      {client && <div>Client sélectionné : {client.name}</div>}
    </div>
  );
}

export default DevisPage;
