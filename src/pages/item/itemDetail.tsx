import { Item } from "../../types/item";

import Badge from "../../component/badge/badge";

import descriptonLogo from "../../assets/descriptionLogo.png";
import noteLogo from "../../assets/noteLogo.png";
import euroLogo from "../../assets/euroLogo.png";

interface ItemDetailProps {
  item: Item;
}

function ItemDetail({ item }: ItemDetailProps) {

    let stockBadgeCSS = "";
    let name = "";

if (item.realstock == 0) {
    stockBadgeCSS = "bg-red-500 text-white";
    name="Rupture de stock";
} else if (item.realstock < 5) {
    stockBadgeCSS = "bg-orange-500 text-white";
    name="Stock faible";
} else {
    stockBadgeCSS = "bg-green-500 text-white";
    name="En stock";
}


  return (
    <div className="bg-white h-10/10 p-2 rounded-2xl flex flex-col gap-4">
      {/*-----------------  1er container: Nom ----------------------
      <div className="overflow-auto border-b-1 border-black pb-2 text-center bold h-1/10 items-center justify-s flex">
        <h1>{item.caption}</h1>
      </div>
      */}

      {/*-----------------  2eme container: Description/Note  ----------------------*/}
      <div className="h-8/10 flex flex-col gap-4">
        {/*-----------------  Description ----------------------*/}
        {item.descomclear && (
          <div className="flex flex-row gap-2 h-4.5/10 border-b-1 border-black pb-2">
            <img src={descriptonLogo} alt="" className="h-6" />:
            <p className="max-h-10/10 overflow-auto ">{item.descomclear}</p>
          </div>
        )}

        {/*----------------- Note  ----------------------*/}
        {item.notesclear && (
          <div className="flex flex-row gap-2 h-4.5/10 border-b-1 border-black pb-2">
            <img src={noteLogo} alt="" className="h-6" />
            <p className="max-h-5/10 overflow-auto ">{item.notesclear}</p>
          </div>
        )}
      </div>

      {/*----------------- 3eme container  ----------------------*/}
      {item.salepricevatincluded && (
        <div className="h-3/10 flex flex-row gap-2 items-center justify-between">
          <div className="flex flex-row gap-2">
            <img src={euroLogo} alt="" className="h-6" />
            <p className="bold">{item.salepricevatincluded}</p>
          </div>
          <div>
            <Badge name={name} css={stockBadgeCSS} />
            { stockBadgeCSS==="Stock faible" && <p>Attention stock: {item.realstock}</p>}
          </div>
        </div>
      )}
      
    </div>
  );
}

export default ItemDetail;
