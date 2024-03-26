import { useNavigate } from "react-router-dom";


function DecoBtn() {

  
  const navigate = useNavigate();
  const goToHome = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };



 
  return (
    <>
      
      <button onClick={goToHome}>Deco</button>

    </>
  );
}

export default DecoBtn;
