import { useState, useEffect, useContext } from "react";
import { fetchItems } from "../../function/function";
import { Item } from "../../types/item";

import dataContext from "../../context/context/dataContext";

import Pagination from "../../component/others/pagination";
import CardContainer from "./cardContainer";
import ItemDetail from "./itemDetail";
import SearchInput from "../../component/others/searchInput";

import loupeLogo from "../../assets/loupeLogo.png";

const ITEMS_PER_PAGE = 25;

function ItemPage() {
  const { itemList, setItemList, showToast } = useContext(dataContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItemId, setSelectedItemId] = useState<string | number | null>(
    null
  );
  const [selectedItem, setSelectedItem] = useState<Item | null | undefined>(
    null
  );

  const [showSearch, setShowSearch] = useState(true);

  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fonction de recherche pour filtrer les éléments en fonction du terme de recherche
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    // Filtrer les éléments en fonction du terme de recherche
    const filtered = itemList.filter((item) =>
      item.caption.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [itemList, searchTerm]);

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

  // -------------------------------  TOAST -------------------------------
  useEffect(() => {
    const item = itemList.find((item) => item.id === selectedItemId);
    setSelectedItem(item);
    if (item && item.realstock == 0) {
      showToast(
        "Attention Rupture de stock",
        5000,
        "bottom",
        "bg-red-500 text-white w-9/10"
      );
    } else if (item && item.realstock < 5) {
      showToast(
        "Attention Stock faible",
        5000,
        "bottom",
        "bg-orange-500 text-white w-9/10"
      );
    }
  }, [selectedItemId, itemList, showToast]);

  const handleCardClick = (id: string | number | null) => {
    setSelectedItemId(id);
  };

  // -------------------------------  Input recherche -------------------------------
  const searchClick = () => {
    setShowSearch(!showSearch);
  };

  // -------------------------------  Render -------------------------------
  return (
    <>
      <div className=" flex flex-col justify-start h-10/10 w-9.5/10 py-2 pb-16 gap-4 ">
        <div className="h-7/10 w-10/10">
          {selectedItem ? (
            <ItemDetail item={selectedItem} />
          ) : (
            <p className="bg-white h-10/10 p-2 rounded-2xl flex flex-col gap-4 text-center">
            Veuillez sélectionner un produit</p>
          )}
        </div>

        <div className="h-3/10 flex flex-col justify-center">
          {showSearch ? (
            <CardContainer
              items={filteredItems}
              onCardClick={handleCardClick}
            />
          ) : (
            <CardContainer
              items={paginatedItems}
              onCardClick={handleCardClick}
            />
          )}

          <div className="flex flex-row  gap-4 self-center w-10/10 ">
            {showSearch ? (
              <SearchInput onSearch={handleSearch} />
            ) : (
              <Pagination
                totalItems={itemList.length}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            )}

            <img src={loupeLogo} alt="" className="h-8" onClick={searchClick} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemPage;
