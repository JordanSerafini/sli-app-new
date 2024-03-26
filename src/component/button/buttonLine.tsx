interface ButtonProps {
    title: string;
    onClick: () => void;
    css?: string;
    }


function Button( {title, onClick, css}: ButtonProps) {


 
  return (
    <>
      
      <button onClick={onClick} className={`${css} border-1 border-primary text-primary p-2 `}>{title}</button>

    </>
  );
}

export default Button;
