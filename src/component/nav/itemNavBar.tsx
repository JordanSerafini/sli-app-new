import { NavLink, useLocation } from 'react-router-dom';
import BackButton from '../button/backBtn';

const ItemNavbar: React.FC<{ setShowModal: React.Dispatch<React.SetStateAction<boolean>>; showModal: boolean }> = ({ setShowModal, showModal }) => {
  const location = useLocation();


  const toggleModal = () => {
    setShowModal(!showModal);
  };


  return (
    <nav className="bg-gray-800 text-white fixed bottom-0 left-0 right-0 flex justify-around p-4">
      <NavLink to="/home" className={location.pathname === '/' ? 'text-yellow-500' : 'hover:text-gray-300'}>Accueil</NavLink>
      <NavLink to="/customer" className={location.pathname === '/customer' ? 'text-yellow-500' : 'hover:text-gray-300'}>Clients</NavLink>
      <NavLink to="/item" className={location.pathname === '/item' ? 'text-yellow-500' : 'hover:text-gray-300'}>Articles</NavLink>
      <button onClick={toggleModal}>Créer article</button>
      <BackButton />
    </nav>
  );
};

export default ItemNavbar;
