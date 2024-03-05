import { useEffect, useContext } from "react"

import dataContext from "../../context/context/dataContext"
import HomeBtn from "../../component/button/homeBtn"

import { fetchItems } from "../../function/function"

function ItemPage() {

  const { itemList, setItemList } = useContext(dataContext);

  useEffect(() => {
    fetchItems(setItemList)
  }, [setItemList])

  const handleclick = () => {
    console.log(itemList)
  }


  return (
    <div>

        <div>
            <button onClick={handleclick}>O</button>
        </div>
        <HomeBtn />
    </div>
  )
}

export default ItemPage