import  { useState } from "react";
import axios from "axios";
import CustomerCard from "../component/cards/customerCard";
import url from "../utils/axios"; 

function Home() {
  const [customerList, setCustomerList] = useState([]);

  const getCustomers = async () => {
    try {
      const response = await axios.get(`${url.local}/customerNew`);

      if (response.data && Array.isArray(response.data.rows)) {
        setCustomerList(response.data.rows);
      } else {
        console.error("La réponse de l'API n'est pas au format attendu.", response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button onClick={getCustomers}>Get Customers</button>
      {customerList.map((customer, index) => (
        <CustomerCard key={index} customer={customer} css="bg-red-500" />
      ))}
    </>
  );
}

export default Home;
