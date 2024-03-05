import { useState, useEffect, useContext } from "react";
import { fetchItems } from "../../function/function";
import dataContext from "../../context/context/dataContext";
import Pagination from "../../component/others/pagination";
import CardContainer from "./cardContainer";
import ItemDetail from "./itemDetail";
import { Item } from "../../types/item";

const ITEMS_PER_PAGE = 25;

function ItemPage() {
  const { itemList, setItemList } = useContext(dataContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItemId, setSelectedItemId] = useState<string | number | null>(
    null
  );
  const [selectedItem, setSelectedItem] = useState<Item | null | undefined>(null);

  // ------------------------------- Fetch items si pas déjà fait -------------------------------
  useEffect(() => {
    if (itemList.length === 0) fetchItems(setItemList);
  }, [setItemList, itemList]);

  // -------------------------------  Pagination -------------------------------
  const paginatedItems = itemList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // -------------------------------  Render -------------------------------
  useEffect(() => {
    const item = itemList.find(item => item.id === selectedItemId);
    setSelectedItem(item);
  }, [selectedItemId, itemList]);

  const handleCardClick = (id: string | number | null) => {
    setSelectedItemId(id);
  };
  // -------------------------------  Render -------------------------------

  return (
    <>
      <div className=" flex flex-col justify-start h-10/10 w-9.5/10 py-2 bg-gray-200 ">
        <div className="h-7/10 w-10/10">
          {selectedItem ? (
            <ItemDetail item={selectedItem} />
          ) : (
            <p>Sélectionner un produit</p>
          )}
        </div>

        <div className="h-3/10 flex flex-col justify-center">
          <CardContainer items={paginatedItems} onCardClick={handleCardClick} />
          <Pagination
            totalItems={itemList.length}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}

export default ItemPage;
