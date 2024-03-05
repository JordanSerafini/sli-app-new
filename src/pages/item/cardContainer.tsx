
import Card from "../../component/cards/card"
import { Item } from "../../types/item";

interface CardContainerProps {
items: Item[];
onCardClick: (id: string | number) => void;
}

const CardContainer: React.FC<CardContainerProps> = ({ items, onCardClick }) => {

        return (
            <div className="h-8/10 p-2 pt-4 flex flex-row gap-4 overflow-auto">
                {items.map((item, index) => (
                    <Card key={index} id={item.id} onClick={() => onCardClick(item.id)} title={item.caption} price={item.salepricevatincluded} familly={item.familyid}  />
                ))}
            </div>
        );
    };
  

export default CardContainer