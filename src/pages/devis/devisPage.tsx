import { useEffect, useMemo } from "react";
import useFetch from "../../hooks/useFetch";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setCustomers } from "../../store/features/customerSlice";
import { Customer } from "../../types/customer";

interface FetchCustomersResponse {
  customers: Customer[];
}

function DevisPage() {
  const limit = 50; // Supposons que cela peut changer en fonction de l'interaction utilisateur
  const offset = 0; // Idem pour offset

  const dispatch = useAppDispatch();
  const { customers } = useAppSelector((state) => state.customers);

  // Inclure limit et offset dans les dépendances pour s'assurer que la requête est mise à jour
  const options = useMemo(
    () => ({
      method: "POST",
      body: JSON.stringify({ limit, offset }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    }),
    [limit, offset]
  );

  const { data, isLoading } = useFetch<FetchCustomersResponse>(
    "/clients",
    options
  );

  useEffect(() => {
    if (data) {
      dispatch(setCustomers(data.customers));
    }
  }, [data, dispatch]);

  // Gestion de la sélection du client
  const handleSelectChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCustomerId = event.target.value;
    console.log("Client sélectionné ID:", selectedCustomerId);
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex flex-col items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <select onChange={handleSelectChange} defaultValue="">
        <option value="" disabled>
          Choisir un client
        </option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DevisPage;
