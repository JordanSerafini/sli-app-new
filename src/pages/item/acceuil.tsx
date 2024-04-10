import { useEffect, useMemo } from "react";
import useFetch from "../../hooks/useFetch";
import { useAppDispatch } from "../../hooks/redux";
import { setItems } from "../../store/features/itemSlice"; 
import { Item } from "../../types/item";

interface FetchItemsResponse {
  items: Item[];

}

function Acceuil() {
  const dispatch = useAppDispatch();
  const limit = 25; 
  const offset = 0;

  // Options de requête pour fetch, dynamiques avec les états de pagination
  const fetchItemsOptions = useMemo(() => ({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      limit,
      offset,
    }),
  }), [limit, offset]);

  const { isLoading, data, error } = useFetch<FetchItemsResponse>("/items", fetchItemsOptions);

  useEffect(() => {
    if (data && data.items) {
      dispatch(setItems(data.items)); 
    }
  }, [data, dispatch]);

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
