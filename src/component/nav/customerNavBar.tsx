import { NavLink, useLocation } from 'react-router-dom';
import BackButton from '../button/backBtn';

const CustomerNavbar: React.FC<{ setShowModal: React.Dispatch<React.SetStateAction<boolean>>; showModal: boolean }> = () => {
  const location = useLocation();



  return (
    <nav className="bg-gray-800 text-white fixed bottom-0 left-0 right-0 flex justify-around p-4">
      <NavLink to="/allMap" className={location.pathname === '/' ? 'text-yellow-500' : 'hover:text-gray-300'}>Map</NavLink>
      <NavLink to="/customer" className={location.pathname === '/profile' ? 'text-yellow-500' : 'hover:text-gray-300'}>Client</NavLink>
      <BackButton />
    </nav>
  );
};

export default CustomerNavbar;
