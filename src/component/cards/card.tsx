import Badge from "../badge/badge";

interface CardProps {
  title: string;
  subTitle?: string;
  data1?: string | number;
  data2?: string | number;
  price?: string | number;
  familly?: string | number | null;
}

const Card: React.FC<CardProps> = ({
  title,
  price,
  subTitle,
  data1,
  data2,
  familly,
}) => {
  return (
    <div className="p-4 rounded-2xl h-9/10 min-w-9/10 bg-white flex flex-col justify-evenly shadow-effect overflow-auto">
      <h3 className="bold">{title}</h3>
      {subTitle && <p>{subTitle}</p>}
      {data1 && <p>{data1}</p>}
      {data2 && <p>{data2}</p>}
      {price && <p>{price}€</p>}
      {familly && <Badge name={familly} css="" />}
    </div>
  );
};

export default Card;
