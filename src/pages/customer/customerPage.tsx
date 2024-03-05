import { useContext, useEffect } from "react";
import {fetchCustomer}  from "../../function/function";

import CustomerCard from "../../component/cards/customerCard";
import CustomerDetail from "../../component/cards/customerDetail";

import dataContext from "../../context/context/dataContext";

function CustomerPage() {
  const {customerList, setCustomerList} = useContext(dataContext);


  useEffect(() => {
    if (customerList.length === 0)
    fetchCustomer(setCustomerList);
  }, [setCustomerList, customerList]);

  return (
    <>
      <div className=" h-10/10 w-9.5/10 flex flex-col ">
        <div className=" h-7/10">
          <CustomerDetail />
        </div>
        <div className="flex flex-row gap-4 h-2/10 overflow-auto w-10/10 pb-4">
          {customerList.map((customer, index) => (
            <CustomerCard key={index} customer={customer} css="min-w-8/10 sm:min-w-4.5/10 md:min-w-3/10" />
          ))}
        </div>
      </div>
    </>
  );
}

export default CustomerPage;
