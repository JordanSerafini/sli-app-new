import { useEffect, useState, useMemo } from "react";
import useFetch from "../../hooks/useFetch";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setItems } from "../../store/features/itemSlice"; 
import { Item } from "../../types/item";

interface FetchItemsResponse {
  items: Item[];

}

function Acceuil() {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(25); 
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

  useEffect(() => {
    if (data && data.items) {
      dispatch(setItems(data.items)); 
    }
  }, [data, dispatch]);

  // Récupération des items à partir du store Redux
  //const items = useAppSelector((state) => state.items.items);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {(error as Error).message}</p>
      ) : (
        <>
          <div>
            ok
          </div>
         
        </>
      )}
    </div>
  );
}

export default Acceuil;
