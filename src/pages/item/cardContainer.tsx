import { useContext } from "react";

import dataContext from "../../context/context/dataContext"

import Card from "../../component/cards/card"

function cardContainer() {

      const { itemList } = useContext(dataContext);

  return (
    <>
        <Card />
    </>
  )
}

export default cardContainer