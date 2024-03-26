import { NavLink, useLocation } from 'react-router-dom';
import BackButton from '../button/backBtn';

const StockNavbar: React.FC<{ setShowModal: React.Dispatch<React.SetStateAction<boolean>>; showModal: boolean }> = ({ setShowModal, showModal }) => {
  const location = useLocation();


  const toggleModal = () => {
    setShowModal(!showModal);
  };


  return (
    <nav className="bg-gray-800 text-white fixed bottom-0 left-0 right-0 flex justify-around p-4">
      <NavLink to="/charts" className={location.pathname === '/' ? 'text-yellow-500' : 'hover:text-gray-300'}>Test</NavLink>
      <NavLink to="/stats" className={location.pathname === '/' ? 'text-yellow-500' : 'hover:text-gray-300'}>Stats</NavLink>
      <button onClick={toggleModal}>Créer StockDoc</button>
      <BackButton />
    </nav>
  );
};

export default StockNavbar;
