import { useNavigate } from "react-router-dom";


function Home() {

  
  const navigate = useNavigate();
  const goToCustomerPage = () => {
    navigate('/customer');
  };
 
  return (
    <>
      
      <button onClick={goToCustomerPage}>Go to Customer Page</button>

    </>
  );
}

export default Home;
