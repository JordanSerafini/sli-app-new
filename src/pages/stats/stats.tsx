import { useContext, useEffect, useState } from "react";
import {
  fetchCustomer,
  fetchItems,
  fetchStockDoc,
  fetchStockDocLinesWithPrice,
} from "../../function/function";
import dataContext from "../../context/context/dataContext";

import BarChart from "../../component/charts/barChart";
import LineChart from "../../component/charts/lineChart";
import DonutChart from "../../component/charts/donutChart";
import {
  StockDocument,
  StockDocumentLineWithPrice,
} from "../../types/stockDoc";
//import url from "../../utils/axios";

/*interface itemSearch {
  name: string;
  totalPrice: string | number;
  stockDoc: string | number;
  quantity: string | number;
  price: string | number;
}*/

function Stats() {
  const { stockDocs, setStockDocs } = useContext(dataContext);
  const { customerList, setCustomerList } = useContext(dataContext);
  const { stockDocLines, setStockDocLines } = useContext(dataContext);
  const { itemList, setItemList } = useContext(dataContext);


  //const [itemSearch, setItemSearch] = useState<itemSearch>({} as itemSearch);
  const [itemSearchCaption, setItemSearchCaption] = useState("");

  //----------------------------------------------------------------------------------------------------------- Gestions des données de sotck fetch, trie et passage au composant BarChart
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

  //----------------------------------------------------------------------------------------------------------- Gestion des données clients fetch et trie pour passage au composant LineChart
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
          const validData = responseData.data.filter(
            (item: StockDocumentLineWithPrice) =>
              item.salepricevatincluded !== undefined
          );
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


    /*
  const calculateTotalPricePerItem = (lines: StockDocumentLineWithPrice[]) => {
    const itemMap = new Map();

    lines.forEach((line) => {
      const { descriptionclear, quantity, salepricevatincluded, documentid } = line;
      if (salepricevatincluded !== null) {
        const price = typeof salepricevatincluded === "string" ? parseFloat(salepricevatincluded) : salepricevatincluded;
        if (itemMap.has(descriptionclear)) {
          const existingItem = itemMap.get(descriptionclear);
          existingItem.quantity += parseFloat(quantity);
          existingItem.totalPrice += price * parseFloat(quantity);
        } else {
          itemMap.set(descriptionclear, {
            descriptionClear: descriptionclear,
            quantity: parseFloat(quantity),
            totalPrice: price * parseFloat(quantity),
            documentid: documentid,
          });
        }
      }
    });

    return Array.from(itemMap.values());
};

  //----------------------------------------------------------------------------------------------------------- Appeler la fonction pour calculer le prix total par item
  const totalPricePerItem = calculateTotalPricePerItem(stockDocLines ?? []);
  const totalPricePerItem2 = calculateTotalPricePerItem(stockDocLines ?? []);


  //--------------------------------------------------------------------------------- Bon Entrée Sort -----------------------------------------------------------------------------------

  const devisDocSort = (stockDocs ?? []).filter(
    (doc) => doc.numberprefix === "BE"
  );


  const BELine = totalPricePerItem.filter((item) => {
    return devisDocSort.some((doc) => doc.id === item.documentid);
  });
  const BEarray: {
    name: string;
    price: number | string;
    totalPrice: number | string;
    stockDoc: StockDocument;
    quantity: number;
  }[] = [];

  BELine.forEach((line) => {
    const totalPrice = line.totalPrice * line.quantity;
    const obj = {
      name: line.descriptionClear,
      totalPrice: totalPrice,
      stockDoc: line.documentid,
      quantity: line.quantity,
      price: line.totalPrice,
    };
    BEarray.push(obj);
  });

  //--------------------------------------------------------------------------------- Bon Sorti Sort -----------------------------------------------------------------------------------

  const BSdoc = (stockDocs ?? []).filter((doc) => doc.numberprefix === "BS");

  const BSLine = totalPricePerItem2.filter((item) => {
    return BSdoc.some((doc) => doc.id === item.documentid);
  });

  const BSarray: {
    name: string;
    price: number | string;
    totalPrice: number | string;
    stockDoc: StockDocumentLineWithPrice;
    quantity: number;
  }[] = [];

  BSLine.forEach((line) => {
    const totalPrice = line.totalPrice * line.quantity;
    const obj = {
      name: line.descriptionClear,
      totalPrice: totalPrice,
      stockDoc: line.documentid,
      quantity: line.quantity,
      price: line.totalPrice,
    };
    BSarray.push(obj);
  });
*/
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchItems(setItemList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [setItemList]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.value;
    setItemSearchCaption(name);
  };

  const donutData = {
    labels: ["BE", "BS"],
    datasets: [
      {
        label: "CA en euros",
        data: [11, 20],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255,99,132,1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await fetch(`${url.main}/getAllBE`);
        if (responseData.ok) {
          const jsonData = await responseData.json();
          setBEData(jsonData);
        } else {
          console.error("Failed to fetch BE data:", responseData.statusText);
        }
      } catch (error) {
        console.error("Error fetching BE data:", error);
      }
    };
  
    fetchData();
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await fetch(`${url.main}/getAllBS`);
        if (responseData.ok) {
          const jsonData = await responseData.json();
          setBSData(jsonData); 
        } else {
          console.error("Failed to fetch BS data:", responseData.statusText);
        }
      } catch (error) {
        console.error("Error fetching BS data:", error);
      }
    };
  
    fetchData();
  }, []);
  */
  
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


  const [BEstockDoc, setBEstockDoc] = useState<StockDocument[] | null>(null);
  const [BSstockDoc, setBSstockDoc] = useState<StockDocument[] | null>(null);

  useEffect(() => {
  const sortBE = stockDocs?.filter((doc) => doc.numberprefix === "BE");
  const sortBS = stockDocs?.filter((doc) => doc.numberprefix === "BS");
  
  setBEstockDoc(sortBE || null);
  setBSstockDoc(sortBS || null);


  } , [stockDocs]);

  interface StockDocAndLines {
    stockDoc: StockDocument;
    lines: StockDocumentLineWithPrice[];
  }
const [BEstockDocAndLines, setBEStockDocAndLines] = useState<StockDocAndLines[]>([]);
const [BSstockDocAndLines, setBSStockDocAndLines] = useState<StockDocAndLines[]>([]);

useEffect(() => {
  if (BEstockDoc && stockDocLines) {
    const BEstockDocAndLines = BEstockDoc.map((doc) => {
      const lines = stockDocLines.filter((line) => line.documentid === doc.id);
      return { stockDoc: doc, lines };
    });
    setBEStockDocAndLines(BEstockDocAndLines);
  } else {
    setBEStockDocAndLines([]);
  } 
} , [BEstockDoc, stockDocLines]);

useEffect(() => {
  if (BSstockDoc && stockDocLines) {
    const BSstockDocAndLines = BSstockDoc.map((doc) => {
      const lines = stockDocLines.filter((line) => line.documentid === doc.id);
      return { stockDoc: doc, lines };
    });
    setBSStockDocAndLines(BSstockDocAndLines);
  } else {
    setBSStockDocAndLines([]);
  } 
} , [BSstockDoc, stockDocLines]);


  



  return (
    <div className="flex flex-col gap-20 bg-secondary-light p-2 h-full mb-40 w-screen">
      <BarChart data={data} title="Statistique Bon Entrée" />
      <LineChart data={lineData} title="Clients par mois" />

      <div>
        <select onChange={handleChange} className="">
          {itemList.map((item) => (
            <option key={item.id + item.caption} value={item.caption}>
              {item.caption}
            </option>
          ))}
        </select>

        {itemSearchCaption && (
          <DonutChart data={donutData} title={itemSearchCaption} />
        )}
      </div>
          {BEstockDocAndLines.map((stockDocAndLines) => (
            <div key={stockDocAndLines.stockDoc.id}>
              <h2>BE {stockDocAndLines.stockDoc.dealid}</h2>
              <ul>
                {stockDocAndLines.lines.map((line) => (
                  <li key={line.id}>
                    {line.descriptionclear} - {line.quantity} - {line.salepricevatincluded}
                  </li>
                ))}
              </ul>
          </div>
          ))}

          {BSstockDocAndLines.map((stockDocAndLines) => (
            <div key={stockDocAndLines.stockDoc.id}>
              <h2>BS {stockDocAndLines.stockDoc.dealid}</h2>
              <ul>
                {stockDocAndLines.lines.map((line) => (
                  <li key={line.id}>
                    {line.descriptionclear} - {line.quantity} - {line.salepricevatincluded}
                  </li>
                ))}
              </ul>
              </div>
          ))}

    </div>
  );
}

export default Stats;
