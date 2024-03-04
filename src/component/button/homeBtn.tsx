import { useNavigate } from "react-router-dom";


function HomeBtn() {

  
  const navigate = useNavigate();
  const goToHome = () => {
    navigate('/');
  };



 
  return (
    <>
      
      <button onClick={goToHome}>X</button>

    </>
  );
}

export default HomeBtn;
