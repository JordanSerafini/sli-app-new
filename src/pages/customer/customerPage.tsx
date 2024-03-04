import { useEffect, useState } from "react";
import axios from "axios";
import url from "../../utils/axios";

import CustomerCard from "../../component/cards/customerCard";
import HomeBtn from "../../component/button/homeBtn";

function CustomerPage() {
  const [customerList, setCustomerList] = useState([]);

  const getCustomers = async () => {
    try {
      const response = await axios.get(`${url.local}/customerNew`);

      if (response.data && Array.isArray(response.data.rows)) {
        setCustomerList(response.data.rows);
      } else {
        console.error(
          "La réponse de l'API n'est pas au format attendu.",
          response
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <>
      <div className="h-10/10 w-9.5/10 flex flex-col ">
        <div className=" h-7/10">Div Detail carte</div>
        <div className="flex flex-row gap-4 h-2/10 overflow-auto w-10/10 pb-4">
          {customerList.map((customer, index) => (
            <CustomerCard key={index} customer={customer} css="min-w-8/10 sm:min-w-4.5/10 md:min-w-3/10" />
          ))}
        </div>
        <HomeBtn />
      </div>
    </>
  );
}

export default CustomerPage;
