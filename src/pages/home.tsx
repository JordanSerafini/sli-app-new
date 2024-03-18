import { useNavigate } from "react-router-dom";

import DecoBtn from "../component/button/decoBtn";

function Home() {

  
  const navigate = useNavigate();
  const goToCustomerPage = () => {
    navigate('/customer');
  };

  const goToItemPage = () => {
    navigate('/item');
  };

  const goToLoginPage = () => {
    navigate('/login');
  };
  

 
  return (
    <>
      
      <button onClick={goToCustomerPage}>Go to Customer Page</button>
      <button onClick={goToItemPage}>Go to Item Page</button>
      <button onClick={goToLoginPage}>Go to Login Page</button>
      <DecoBtn />

    </>
  );
}

export default Home;
