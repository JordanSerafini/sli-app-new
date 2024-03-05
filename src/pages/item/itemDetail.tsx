import { Item } from "../../types/item";

interface ItemDetailProps {
  item: Item;
}

function ItemDetail({ item }: ItemDetailProps) {
  return (
    <div className="bg-red-200 h-10/10 p-2 rounded-2xl">
        <div className="border-b-1 border-black pb-2 text-center bold">
            <h1>{item.caption}</h1>
        </div>
        <div>
            <p>{item.descomclear}</p>
            <p>{item.notesclear}</p>
            
        </div>
    </div>
  );
}

export default ItemDetail;
