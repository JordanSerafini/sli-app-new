import { useState, useEffect, useContext } from 'react';
import { fetchItems } from '../../function/function';
import dataContext from '../../context/context/dataContext';
import Pagination from '../../component/others/pagination';
import HomeBtn from '../../component/button/homeBtn';
import CardContainer from './cardContainer';

const ITEMS_PER_PAGE = 25;

function ItemPage() {
  const { itemList, setItemList } = useContext(dataContext);
  const [currentPage, setCurrentPage] = useState(1);

  // ------------------------------- Fetch items si pas déjà fait ------------------------------- 
  useEffect(() => {
    if (itemList.length === 0) fetchItems(setItemList);
  }, [setItemList, itemList]);

  // -------------------------------  Pagination ------------------------------- 
  const paginatedItems = itemList.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className=" flex flex-col justify-start h-10/10 w-9.5/10 py-2">
        <div className="bg-blue-200 h-7/10 w-10/10">Div Detail carte</div>
        <div className="h-3/10 flex flex-col justify-center">
          <CardContainer items={paginatedItems} />
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
