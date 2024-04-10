import { useEffect, useState, useMemo } from "react";
import useFetch from "../../hooks/useFetch";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setItems } from "../../store/features/itemSlice"; 
import { Item } from "../../types/item";

interface FetchItemsResponse {
  items: Item[];
  totalPages: number;
  totalItems: number;
}

function Acceuil() {
  const dispatch = useAppDispatch();
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(25); // Nombre d'items par page, avec une valeur initiale

  const offset = (currentPage - 1) * limit;


  // Options de requête pour fetch, dynamiques avec les états de pagination
  const fetchOptions = useMemo(() => ({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      limit,
      offset,
    }),
  }), [limit, offset]);

  const { isLoading, data, error } = useFetch<FetchItemsResponse>("/items", fetchOptions);

  // Récupération des items à partir du store Redux
  const items = useAppSelector((state) => state.items.items);

  useEffect(() => {
    if (data && data.items) {
      dispatch(setItems(data.items)); 
      setTotalPages(data.totalPages);
    }
  }, [data, dispatch]);

  const handleNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {(error as Error).message}</p>
      ) : (
        <>
          <div>
            {items && items.map((item, index) => (
              <div key={index}>{item.caption}</div>
            ))}
          </div>
          <div>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Précédent
            </button>
            <button onClick={handleNextPage} disabled={currentPage >= totalPages}>
              Suivant
            </button>
            <select value={limit} onChange={handleLimitChange}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span>Page: {currentPage}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default Acceuil;
