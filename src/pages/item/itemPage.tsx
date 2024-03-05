import { useEffect, useContext } from "react";
import { fetchItems } from "../../function/function";

import dataContext from "../../context/context/dataContext";

import HomeBtn from "../../component/button/homeBtn";
import CardContainer from "./cardContainer";

function ItemPage() {
  const { itemList, setItemList } = useContext(dataContext);

  useEffect(() => {
    if (itemList.length === 0) fetchItems(setItemList);
  }, [setItemList, itemList]);


  return (
    <>
      <div className=" flex flex-col justify-start h-10/10 w-9.5/10">
        <div className="bg-blue-200 h-7/10 w-10/10">Div Detail carte</div>
        <div className="h-3/10">
        <CardContainer />
        <HomeBtn />
        </div>
      </div>
    </>
  );
}

export default ItemPage;
