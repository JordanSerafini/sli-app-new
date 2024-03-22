import { useContext, useEffect } from "react";
import {
  fetchCustomer,
  fetchStockDoc,
  fetchStockDocLinesWithPrice,
} from "../../function/function";
import dataContext from "../../context/context/dataContext";

import BarChart from "../../component/charts/barChart";
import LineChart from "../../component/charts/lineChart";
import { StockDocumentLineWithPrice } from "../../types/stockDoc";

function Stats() {
  const { stockDocs, setStockDocs } = useContext(dataContext);
  const { customerList, setCustomerList } = useContext(dataContext);
  const {stockDocLines, setStockDocLines} = useContext(dataContext);

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
    const fetchData = async () => {
      try {
        const responseData = await fetchStockDocLinesWithPrice();
        if (responseData?.data) {
          // Assurez-vous que chaque élément dans responseData.data a la structure de StockDocumentLineWithPrice
          const validData = responseData.data.filter((item: StockDocumentLineWithPrice) => item.salepricevatincluded !== undefined);
          if (setStockDocLines) {
            setStockDocLines(validData);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [setStockDocLines]);
  

  const calculateTotalPricePerItem = (lines: StockDocumentLineWithPrice[]) => {
    const itemMap = new Map(); // Utiliser une carte pour regrouper les lignes par item
  
    // Parcourir les lignes pour les regrouper par item
    lines.forEach((line) => {
      const { descriptionclear, quantity, salepricevatincluded, documentid } = line;
  
      // Vérifier si salepricevatincluded est défini et n'est pas null
      if (salepricevatincluded !== null) {
        // Convertir salepricevatincluded en nombre
        const price = typeof salepricevatincluded === 'string' ? parseFloat(salepricevatincluded) : salepricevatincluded;
  
        // Vérifier si l'item existe déjà dans la carte
        if (itemMap.has(descriptionclear)) {
          // Si oui, mettre à jour la quantité totale et le prix total
          const existingItem = itemMap.get(descriptionclear);
          existingItem.quantity += parseFloat(quantity);
          existingItem.totalPrice += price * parseFloat(quantity);
        } else {
          // Si non, ajouter un nouvel élément à la carte
          itemMap.set(descriptionclear, {
            descriptionClear: descriptionclear,
            quantity: parseFloat(quantity),
            totalPrice: price * parseFloat(quantity),
            documentid: documentid
          });
        }
      }
    });
  
    // Convertir la carte en tableau d'objets
    const totalPricePerItem = Array.from(itemMap.values());
    return totalPricePerItem;
  };
  
  // Appeler la fonction pour calculer le prix total par item
  const totalPricePerItem = calculateTotalPricePerItem(stockDocLines?? []);

  const devisDocSort = (stockDocs ?? []).filter((doc) => doc.numberprefix === "BE");

  const BELine = totalPricePerItem.filter((item) => {
    return devisDocSort.some((doc) => doc.id === item.documentid);
  });
const BEarray = [];

BELine.forEach((line) => {
  const totalPrice = line.totalPrice * line.quantity;
  const obj = {
    name: line.descriptionClear,
    price: totalPrice,
    stockDoc: line.documentid
  };
  BEarray.push(obj);
});

  return (
    <div className="flex flex-col gap-20 bg-secondary-light p-2 h-full">
      <BarChart data={data} title="Statistique Bon Entrée" />
      <LineChart data={lineData} title="Clients par mois" />
      <div></div>
    </div>
  );
}

export default Stats;
