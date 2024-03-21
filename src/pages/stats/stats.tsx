import { useContext, useEffect, useState } from "react";
import {
  fetchCustomer,
  fetchStockDoc,
  fetchItems,
} from "../../function/function";
import dataContext from "../../context/context/dataContext";

import BarChart from "../../component/charts/barChart";
import LineChart from "../../component/charts/lineChart";
import { StockDocumentLine } from "../../types/stockDoc";

function Stats() {
  const { stockDocs, setStockDocs } = useContext(dataContext);
  const { customerList, setCustomerList } = useContext(dataContext);
  const { itemList, setItemList } = useContext(dataContext);
  const [devisLine, setDevisLine] = useState<[]>([]);

  // Gestions des données de sotck fetch, trie et passage au composant BarChart
  useEffect(() => {
    const fetchData = async () => {
      // Vérifier si stockDocs est vide ou null
      if (!stockDocs || stockDocs.length === 0) {
        try {
          const data = await fetchStockDoc();
          if (setStockDocs) {
            setStockDocs(data);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [stockDocs, setStockDocs]);

  const dataSortByMonth = stockDocs?.reduce((acc, doc) => {
    const month = new Date(doc.documentdate).getMonth();
    acc[month] = acc[month] ? acc[month] + 1 : 1;
    return acc;
  }, [] as number[]);

  // Gestion des données clients fetch et trie pour passage au composant LineChart
  useEffect(() => {
    if (customerList.length === 0) fetchCustomer(setCustomerList);
  }, [setCustomerList, customerList]);

  let cumulativeCustomers = 0;
  const dataCustomerCumulativeByMonth = customerList?.reduce(
    (acc, customer) => {
      if (customer.syscreateddate) {
        const month = new Date(customer.syscreateddate).getMonth();
        cumulativeCustomers += 1; // Ajouter 1 client pour chaque enregistrement
        acc[month] = cumulativeCustomers;
      }
      return acc;
    },
    [] as number[]
  );

  const lineData = {
    labels: [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Aout",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ],
    datasets: [
      {
        label: "Total mensuel",
        data: dataCustomerCumulativeByMonth || [],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };

  const data = {
    labels: [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Aout",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ],
    datasets: [
      {
        label: "Ventes 2024",
        data: dataSortByMonth || [],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  useEffect(() => {
    if (itemList.length === 0) fetchItems(setItemList);
  }, [setItemList, itemList]);

   const test = devisLine.map((line: StockDocumentLine) => {
      const item = itemList.find((item) => item.id === line.itemid);
      console.log(item);
        return {
            ...line,
            item,
        };
        
    });

    console.log(test);


  return (
    <div className="flex flex-col gap-20 bg-secondary-light p-2 h-full">
      <BarChart data={data} title="Statistique Bon Entrée" />
      <LineChart data={lineData} title="Clients par mois" />
      <div></div>
    </div>
  );
}

export default Stats;
