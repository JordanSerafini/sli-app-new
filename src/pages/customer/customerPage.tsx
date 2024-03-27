import  { useContext, useEffect, useState } from "react";
import { fetchCustomer } from "../../function/function";

import CustomerCard from "../../component/cards/customerCard";
import CustomerDetail from "../../component/cards/customerDetail";
import CustomerNavbar from "../../component/nav/customerNavBar";

import dataContext from "../../context/context/dataContext";
import { Customer } from "../../types/customer";

function CustomerPage() {
  const { customerList, setCustomerList } = useContext(dataContext);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCardClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowMap(false);
  };

  useEffect(() => {
    if (customerList.length === 0) {
      fetchCustomer(setCustomerList);
    }
  }, [setCustomerList, customerList]);

  const filteredCustomers = customerList.filter((customer) =>
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className=" h-9/10 w-9.5/10 flex flex-col items-center justify-center mb-16">
       
        <div className=" h-8/10 w-full items-center flex">
          {selectedCustomer != null ? (
            <CustomerDetail customer={selectedCustomer} showMap={showMap} setShowMap={setShowMap} />
          ) : (
            <div className="bg-white h-9.5/10 w-full p-2 rounded-2xl flex flex-col gap-4 items-center">
              Veuillez sélectionner un utilisateur
            </div>
          )}
        </div>
        <div className="flex flex-row gap-4 h-2/10 overflow-auto w-10/10 pb-4 overflow-y-hidden">
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer, index) => (
              <CustomerCard
                onClick={handleCardClick}
                key={index}
                customer={customer}
                css="min-w-8/10 sm:min-w-4.5/10 md:min-w-3/10"
              />
            ))
          ) : (
            <div>Aucun client trouvé.</div>
          )}
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher un client ..."
          className="w-6/10 rounded-2xl border-2 border-secondary text-center tracking-widest"
        />
      </div>
      <CustomerNavbar setShowModal={setShowMap} showModal={showMap} />
    </>
  );
}

export default CustomerPage;
