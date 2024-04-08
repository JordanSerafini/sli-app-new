interface IconProps {
  type: string;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const Icon: React.FC<IconProps> = ({ type, onClick, className = '', style }) => {

  const theme = "blue";

return (
    <span
      className={`material-symbols-outlined ${className}`}
      onClick={onClick}
      style={{ cursor: 'pointer', color:`${theme}`, ...style }}
    >
      {type}
    </span>
  );
};

export default Icon;
