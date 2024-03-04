import { useNavigate } from "react-router-dom";


function Home() {

  
  const navigate = useNavigate();
  const goToCustomerPage = () => {
    navigate('/customer');
  };

  const goToItemPage = () => {
    navigate('/item');
  };

 
  return (
    <>
      
      <button onClick={goToCustomerPage}>Go to Customer Page</button>
      <button onClick={goToItemPage}>Go to Item Page</button>

    </>
  );
}

export default Home;
