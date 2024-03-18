import { useNavigate } from 'react-router-dom';

import DecoBtn from '../component/button/decoBtn';
import BottomNavbar from '../component/nav/bottomNavBar';

function Home() {
  
  const navigate = useNavigate();
  
  const goToCustomerPage = () => {
    navigate('/customer');
  };



  return (
    <>
      <div>
        <button onClick={goToCustomerPage}>Go to Customer Page</button>
      </div>

      <DecoBtn />
      <BottomNavbar />      
      
    </>
  );
}

export default Home;
