
import Card from "../../component/cards/card"
import { Item } from "../../types/item";

interface CardContainerProps {
items: Item[];
}

const CardContainer: React.FC<CardContainerProps> = ({ items }) => {
    return (
      <div className="bg-green-200 h-8/10 p-2 pt-4 flex flex-row gap-4 overflow-auto">
        {items.map((item, index) => (
          <Card key={index} title={item.caption} price={item.salepricevatincluded} familly={item.familyid} />
        ))}
      </div>
    );
  };
  

export default CardContainer