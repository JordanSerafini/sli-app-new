import React from 'react';
import Badge from "../badge/badge";

interface CardProps {
  id: string | number;
  title: string;
  subTitle?: string;
  data1?: string | number;
  data2?: string | number;
  price?: string | number;
  familly?: string | number | null;
  onClick: (id: string | number) => void; // Accepter les deux types
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  price,
  subTitle,
  data1,
  data2,
  familly,
  onClick,
}) => {
  return (
    <div onClick={() => onClick(id.toString())} className="p-4 rounded-2xl h-9/10 min-w-9/10 bg-white flex flex-col justify-evenly shadow-effect overflow-auto">
      <h3 className="bold text-grayblue">{title}</h3>
      {subTitle && <p>{subTitle}</p>}
      {data1 && <p>{data1}</p>}
      {data2 && <p>{data2}</p>}
      {price && <p>{price}€</p>}
      {familly && <Badge name={familly.toString()} css="" />}
    </div>
  );
};

export default Card;
