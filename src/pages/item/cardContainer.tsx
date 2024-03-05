import { useContext } from "react";

import dataContext from "../../context/context/dataContext"

import Card from "../../component/cards/card"

function CardContainer() {

      const { itemList } = useContext(dataContext);

  return (
    <div className=" h-8/10 p-2 pt-4">
        {itemList.map((item, index) => (
            <Card key={index} title={item.caption} data2={item.salepricevatincluded} familly={item.familyid} />
        ))}

    </div>
  )
}

export default CardContainer