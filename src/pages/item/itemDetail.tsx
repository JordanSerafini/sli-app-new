import { Item } from "../../types/item";

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
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleStock = () => {
    setShowModal(true);
  };


  const saveStock = () => {
    // Implémentez ici la logique pour la modification du stock
    setShowModal(false);
  };

  let itemImage = false;
  if (item.caption === "- Unité centrale FUJITSU P420 core i 420") {
    itemImage = true;
  }

  let stockBadgeCSS = "";
  let name = "";

  if (item.realstock === 0) {
    stockBadgeCSS = "bg-red-500 text-white";
    name = "Rupture de stock";
  } else if (item.realstock < 5) {
    stockBadgeCSS = "bg-orange-500 text-white";
    name = "Stock faible";
  } else {
    stockBadgeCSS = "bg-green-500 text-white";
    name = "En stock";
  }

  return (
    <div className="bg-white h-10/10 p-2 rounded-2xl flex flex-col gap-4">
      <div className="h-2/10 overflow-auto border-b-1 border-grayblue pb-2 text-center bold items-center justify-evenly flex flex-row">
        <h1 className="text-grayblue overflow-auto max-h-9/10">
          {item.caption}
        </h1>
        {itemImage && (
          <img src={unitecentraleIMG} alt="Image" className="h-9.5/10 w-auto" />
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

      {showModal && (
        <div
          ref={modalRef}
          className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white p-4 rounded-lg w-9/10" >
            <p className="text-center p-">Modification du stock :</p>
            <input
              type="number"
              value={newStockValue}
              className="w-full p-2 border-1 border-gray-300 rounded-lg mt-2 mb-2"
              onChange={(e) => setNewStockValue(parseInt(e.target.value))}
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
