import { Item } from "../../types/item";
import axios from "axios";
import url from "../../utils/axios";

import Badge from "../../component/badge/badge";
import BarChart from "../../component/charts/barChart";

import descriptonLogo from "../../assets/descriptionLogo.png";
import noteLogo from "../../assets/noteLogo.png";
import euroLogo from "../../assets/euroLogo.png";
import unitecentraleIMG from "../../assets/unitecentrale.jpg";
import { TouchEventHandler, useContext, useEffect, useRef, useState } from "react";
import {
  StockDocument,
  StockDocumentLineWithPrice,
} from "../../types/stockDoc";
import dataContext from "../../context/context/dataContext";
import {
  fetchStockDoc,
  fetchStockDocLinesWithPrice,
} from "../../function/function";

interface ItemDetailProps {
  item: Item;
}

function ItemDetail({ item }: ItemDetailProps) {
  const [newStockValue, setNewStockValue] = useState(item.realstock);
  const [showModal, setShowModal] = useState(false);
  const [isSwap, setIsSwap] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNewStockValue(item.realstock);
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal, item.realstock]);

  const handleStock = () => {
    setShowModal(true);
  };

  const saveStock = async () => {
    const apiUrl = `${url.main}/updateItemStock`;
    const itemData = {
      caption: item.caption,
      stock: newStockValue,
    };

    try {
      const response = await axios.post(apiUrl, itemData);
      if (response) setShowModal(false); // Fermer la modal après succès
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Erreur lors de la modification du stock:",
          error.response?.data
        );
      } else if (error instanceof Error) {
        console.error(
          "Erreur lors de la modification du stock:",
          error.message
        );
      } else {
        console.error("Une erreur inconnue est survenue");
      }
    }
    alert("Stock modifié avec succès");
  };

  let itemImage = false;
  if (item.caption === "- Unité centrale FUJITSU P420 core i 420") {
    itemImage = true;
  }

  let stockBadgeCSS = "";
  let name = "";

  if (item.realstock == 0) {
    stockBadgeCSS = "bg-red-500 text-white";
    name = "Rupture de stock";
  } else if (item.realstock < 5) {
    stockBadgeCSS = "bg-orange-500 text-white";
    name = "Stock faible";
  } else {
    stockBadgeCSS = "bg-green-500 text-white";
    name = "En stock";
  }

  const handleSwap = () => {
    setIsSwap(!isSwap);
  };

  const handleReservationColor = () => {
    if (item.realstock == 0) {
      return "bg-red-500";
    } else {
      return "bg-green-500";
    }
  };

  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const { stockDocLines, setStockDocLines } = useContext(dataContext);
  const { stockDocs, setStockDocs } = useContext(dataContext);

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

  const [BEstockDoc, setBEstockDoc] = useState<StockDocument[] | null>(null);
  const [BSstockDoc, setBSstockDoc] = useState<StockDocument[] | null>(null);

  useEffect(() => {
    if (stockDocs) {
      const BEstockDocs = stockDocs.filter((doc) => doc.numberprefix === "BE");
      const BSstockDocs = stockDocs.filter((doc) => doc.numberprefix === "BS");
      setBEstockDoc(BEstockDocs);
      setBSstockDoc(BSstockDocs);
    }
  }, [stockDocs]);

  const BELine = stockDocLines
    ?.filter((line) => BEstockDoc?.some((doc) => doc.id === line.documentid))
    .map((line) => ({
      id: line.id,
      name: line.descriptionclear,
      quantity: line.quantity,
      price: line.salepricevatincluded,
      date: BEstockDoc?.find((doc) => doc.id === line.documentid)?.documentdate
        ? new Date(
            BEstockDoc.find((doc) => doc.id === line.documentid)
              ?.documentdate ?? ""
          ).toLocaleDateString("fr-FR")
        : "",
      type: "BE",
    }));

  const [BEitemData, setBEitemData] = useState<
    { descriptionClear: string; quantity: number; totalPrice: number }[] | null
  >(null);

  useEffect(() => {
    if (item) {
      const filteredBE = BELine?.filter((line) => line.name === item.caption);
      if (filteredBE) {
        const mappedData = filteredBE.map((line) => ({
          descriptionClear: line.name,
          quantity: parseInt(line.quantity),
          totalPrice: parseFloat(line.price as string) || 0,
          date: line.date,
          type: line.type,
        }));
        setBEitemData(mappedData);
      }
    }
  }, [item]);

  const BSLine = stockDocLines
    ?.filter((line) => BSstockDoc?.some((doc) => doc.id === line.documentid))
    .map((line) => ({
      id: line.id,
      name: line.descriptionclear,
      quantity: line.quantity,
      price: line.salepricevatincluded,
      date: BSstockDoc?.find((doc) => doc.id === line.documentid)?.documentdate
        ? new Date(
            BSstockDoc.find((doc) => doc.id === line.documentid)
              ?.documentdate ?? ""
          ).toLocaleDateString("fr-FR")
        : "",
      type: "BS",
    }));

  const [BSitemData, setBSitemData] = useState<
    { descriptionClear: string; quantity: number; totalPrice: number }[] | null
  >(null);

  useEffect(() => {
    if (item) {
      const filteredBS = BSLine?.filter((line) => line.name === item.caption);
      if (filteredBS) {
        const mappedData = filteredBS.map((line) => ({
          descriptionClear: line.name,
          quantity: parseInt(line.quantity),
          totalPrice: parseFloat(line.price as string) || 0,
          date: line.date,
          type: line.type,
        }));
        setBSitemData(mappedData);
      }
    }
  }, [item]);

  const groupByMonthAndProduct = (items: unknown[] | null) => {
    const groupedData: {
      month: number;
      descriptionClear: unknown;
      quantity: unknown;
    }[] = [];

    (
      items as {
        date: string;
        descriptionClear: string;
        quantity: number | string;
      }[]
    )?.forEach((item) => {
      const month = parseInt(item.date.split("/")[1], 10); // Extraction du mois
      const existingEntry = groupedData.find(
        (entry) =>
          entry.month === month &&
          entry.descriptionClear === item.descriptionClear
      );

      if (existingEntry) {
        existingEntry.quantity =
          Number(existingEntry.quantity) + Number(item.quantity);
      } else {
        groupedData.push({
          month,
          descriptionClear: item.descriptionClear,
          quantity: item.quantity,
        });
      }
    });

    return groupedData;
  };

  // Données regroupées par mois pour BEitemData
  const BEGroupedData = groupByMonthAndProduct(BEitemData);

  // Données regroupées par mois pour BSitemdata
  const BSGroupedData = groupByMonthAndProduct(BSitemData);

  interface MonthlyData {
    month: number;
    descriptionClear: string;
    quantity: string | number;
  }

  const annuaryData = (data: MonthlyData[]) => {
    const january = data.filter((item: { month: number }) => item.month === 1);
    const february = data.filter((item: { month: number }) => item.month === 2);
    const march = data.filter((item: { month: number }) => item.month === 3);
    const april = data.filter((item: { month: number }) => item.month === 4);
    const may = data.filter((item: { month: number }) => item.month === 5);
    const june = data.filter((item: { month: number }) => item.month === 6);
    const july = data.filter((item: { month: number }) => item.month === 7);
    const august = data.filter((item: { month: number }) => item.month === 8);
    const september = data.filter(
      (item: { month: number }) => item.month === 9
    );
    const october = data.filter((item: { month: number }) => item.month === 10);
    const november = data.filter(
      (item: { month: number }) => item.month === 11
    );
    const december = data.filter(
      (item: { month: number }) => item.month === 12
    );

    return {
      january,
      february,
      march,
      april,
      may,
      june,
      july,
      august,
      september,
      october,
      november,
      december,
    };
  };

  const BEannuaryData = annuaryData(BEGroupedData as MonthlyData[]);
  const BSannuaryData = annuaryData(BSGroupedData as MonthlyData[]);

  const barChartData = {
    labels: [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ],
    datasets: [
      {
        label: "Bon entrée",
        data: [
          BEannuaryData.january[0]?.quantity ?? 50,
          BEannuaryData.february[0]?.quantity ?? 95,
          BEannuaryData.march[0]?.quantity ?? 100,
          BEannuaryData.april[0]?.quantity ?? 80,
          BEannuaryData.may[0]?.quantity ?? 20,
          BEannuaryData.june[0]?.quantity ?? 80,
          BEannuaryData.july[0]?.quantity ?? 125,
          BEannuaryData.august[0]?.quantity ?? 75,
          BEannuaryData.september[0]?.quantity ?? 50,
          BEannuaryData.october[0]?.quantity ?? 60,
          BEannuaryData.november[0]?.quantity ?? 30,
          BEannuaryData.december[0]?.quantity ?? 70,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        fill: false,
      },
      {
        label: "Bon sortie",
        data: [
          BSannuaryData.january[0]?.quantity ?? 150,
          BSannuaryData.february[0]?.quantity ?? 50,
          BSannuaryData.march[0]?.quantity ?? 20,
          BSannuaryData.april[0]?.quantity ?? 20,
          BSannuaryData.may[0]?.quantity ?? 70,
          BSannuaryData.june[0]?.quantity ?? 40,
          BSannuaryData.july[0]?.quantity ?? 20,
          BSannuaryData.august[0]?.quantity ?? 40,
          BSannuaryData.september[0]?.quantity ?? 80,
          BSannuaryData.october[0]?.quantity ?? 90,
          BSannuaryData.november[0]?.quantity ?? 70,
          BSannuaryData.december[0]?.quantity ?? 110,
        ],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        fill: false,
      },
    ],
  };


// ? Partie swap glissé
let touchStartX: number = 0;
 // Gestion de l'événement onTouchStart
 const handleTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
  touchStartX = e.touches[0].clientX;
};

// Gestion de l'événement onTouchEnd
const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  const distanceMoved = touchStartX - touchEndX;

  if (distanceMoved > 150) {
    handleSwap();
  } else if (distanceMoved < -150) {
    handleSwap();
  }
};

  return (
    <div
      className="bg-white h-10/10 p-2 rounded-2xl flex flex-col gap-4 overflow-scroll"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd} 
    >
      {isSwap ? (
        <div className="flex flex-col gap-6 h-10/10 ">

          {/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
          <div className="flex flex-row justify-between p-4">
            {/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
            <div className="flex flex-row gap-1 items-center ">
              <p>réservation :</p>
              <div
                className={`h-4 w-4 rounded-full ${handleReservationColor()}`}
              ></div>
            </div>
            {/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
            <div className="flex flex-row gap-1 items-center border-2 border-secondary p-2 rounded-full  text-secondary">
              <p>note :</p>
              <div>{Math.ceil(item.brandrate)}</div>
            </div>
          </div>
          {/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-1">
              <h4>Prix achat :</h4>
              <p>{item.purchaseprice}</p>
            </div>
            <div className="flex flex-row gap-1">
              <h4>Valeur du stock:</h4>
              <p>{item.stockvalue}</p>
            </div>
          </div>
          {/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
          <div className="flex flex-row w-full justify-between text-secondary">
            <h4> Fournisseur : </h4>
            <p>{item.supplierid}</p>
          </div>
          {/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

          <BarChart
            data={{
              labels: barChartData.labels,
              datasets: barChartData.datasets.map((dataset) => ({
                ...dataset,
                data: dataset.data.map((value) =>
                  typeof value === "string" ? Number(value) : value
                ),
              })),
            }}
            title={item.caption}
          />
        </div>
      ) : (
        <>
          <div className="h-2/10 overflow-auto border-b-1 border-grayblue pb-2 text-center bold items-center justify-evenly flex flex-row">
            <h1 className="text-grayblue overflow-auto max-h-9/10">
              {item.caption}
            </h1>
            {itemImage && (
              <img
                src={unitecentraleIMG}
                alt="Image"
                className="h-9.5/10 w-auto"
              />
            )}
          </div>

          <div className="h-6/10 flex flex-col gap-4 text-xs">
            {item.descomclear && (
              <div className="flex flex-row gap-2 h-4.5/10 border-b-1 border-grayblue pb-2">
                <img src={descriptonLogo} alt="" className="h-6" />:
                <p className="max-h-10/10 overflow-auto ">{item.descomclear}</p>
              </div>
            )}

            {item.notesclear && (
              <div className="flex flex-row gap-2 h-4.5/10 border-b-1 border-grayblue pb-2">
                <img src={noteLogo} alt="" className="h-6" />:
                <p className="max-h-10/10 overflow-auto ">{item.notesclear}</p>
              </div>
            )}
          </div>

          {item.salepricevatincluded && (
            <div className="h-2/10 flex flex-row gap-2 items-center justify-between">
              <div className="flex flex-row gap-2">
                <img src={euroLogo} alt="" className="h-6" />
                <p>{item.salepricevatincluded}</p>
              </div>
              <div className="" onClick={handleStock}>
                <Badge name={name} css={stockBadgeCSS} />
              </div>
            </div>
          )}
        </>
      )}

      {showModal && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center"
          onClick={() => setShowModal(false)}
        >
          <div
            ref={modalRef}
            className="bg-white p-4 rounded-lg w-9/10"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-center">
              stock actuel: <span className="bold">{item.realstock}</span>
            </p>
            <input
              type="number"
              value={newStockValue}
              className="w-full p-2 border-1 border-gray-300 rounded-lg mt-2 mb-2"
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value) && value >= 0) {
                  setNewStockValue(value);
                } else {
                  setNewStockValue(e.target.value === "0" ? 0 : newStockValue);
                }
              }}
            />

            <div className="flex flex-row justify-between">
              <button onClick={saveStock}>Enregistrer</button>
              <button onClick={() => setShowModal(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemDetail;
