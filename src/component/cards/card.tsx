import Badge from "../badge/badge";

interface CardProps {
  title: string;
  subTitle?: string;
  data1?: string | number;
  data2?: string | number;
  familly?: string | number | null; 
}

const Card: React.FC<CardProps> = ({ title, subTitle, data1, data2, familly }) => {
  return (
    <div className="p-4 rounded-2xl h-9/10 bg-white flex flex-col justify-evenly shadow-effect ">
      <h3>{title}</h3>
      {subTitle && <p>{subTitle}</p>}
      {data1 && <p>{data1}</p>}
      {data2 && <p>{data2}</p>}
      {familly && <Badge name={familly} css="" />}
    </div>
  );
};

export default Card;
