import { Item } from "../../types/item";
import axios from "axios";
import url from "../../utils/axios";

import Badge from "../../component/badge/badge";

import descriptonLogo from "../../assets/descriptionLogo.png";
import noteLogo from "../../assets/noteLogo.png";
import euroLogo from "../../assets/euroLogo.png";
import unitecentraleIMG from "../../assets/unitecentrale.jpg";
import { useEffect, useRef, useState } from "react";

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
    //console.log("itemData:", itemData);

    try {
      const response = await axios.post(apiUrl, itemData);
      //console.log("Stock modifié avec succès:", response.data);
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
    if (item.stockbookingallowed == 0) {
      return "bg-red-500";
      
    } else {
      return "bg-green-500";
    }
  }
  console.log(item.stockbookingallowed);


  return (
    <div className="bg-white h-10/10 p-2 rounded-2xl flex flex-col gap-4">
      {isSwap ? (
        <div>
          <div>
            <p>réservation:</p>
            <div className={`h-4 w-4 rounded-full ${handleReservationColor()}`}>
              
            </div>
          </div>
          <button onClick={handleSwap}>O</button>
        </div>
      ) : (
        <>
          <div className="h-2/10 overflow-auto border-b-1 border-grayblue pb-2 text-center bold items-center justify-evenly flex flex-row">
            <button onClick={handleSwap}>O</button>
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
