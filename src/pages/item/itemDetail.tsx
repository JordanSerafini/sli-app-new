import { Item } from "../../types/item";

import descriptonLogo from "../../assets/descriptionLogo.png";
import noteLogo from "../../assets/noteLogo.png";

interface ItemDetailProps {
  item: Item;
}

function ItemDetail({ item }: ItemDetailProps) {
  return (
    <div className="bg-white h-10/10 p-2 rounded-2xl flex flex-col gap-4">

      {/*-----------------  1er container: Nom ----------------------*/}
      <div className="overflow-auto border-b-1 border-black pb-2 text-center bold h-1/10 items-center justify-center flex">
        <h1>{item.caption}</h1>
      </div>

      {/*-----------------  2eme container: Description/Note  ----------------------*/}
      <div className="max-h-6/10 flex flex-col gap-4 bg-red-200">

        {/*-----------------  Description ----------------------*/}
        {item.descomclear && (
          <div className="flex flex-row gap-2 h-4.5/10">
            <img src={descriptonLogo} alt="" className="h-6" />:
            <p className="max-h-10/10 overflow-auto ">{item.descomclear}</p>
          </div>
        )}

        {/*----------------- Note  ----------------------*/}

        {item.notesclear && (
          <div className="flex flex-row gap-2 h-4.5/10">
          <img src={noteLogo} alt="" className="h-6" />
            <p className="max-h-5/10 overflow-auto ">{item.notesclear}</p>
          </div>
        )}
      </div>


    </div>
  );
}

export default ItemDetail;
