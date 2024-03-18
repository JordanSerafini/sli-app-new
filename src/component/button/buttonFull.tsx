interface ButtonProps {
    title: string;
    onClick: () => void;
    css?: string;
    }


function Button( {title, onClick, css}: ButtonProps) {


 
  return (
    <>
      
      <button onClick={onClick} className={`${css} bg-primary text-white p-2 `}>{title}</button>

    </>
  );
}

export default Button;
