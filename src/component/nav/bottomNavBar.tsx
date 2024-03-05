import { NavLink, useLocation } from 'react-router-dom';

const BottomNavbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gray-800 text-white fixed bottom-0 left-0 right-0 flex justify-around p-4">
      <NavLink to="/" className={location.pathname === '/' ? 'text-yellow-500' : 'hover:text-gray-300'}>Accueil</NavLink>
      <NavLink to="/customer" className={location.pathname === '/customer' ? 'text-yellow-500' : 'hover:text-gray-300'}>Clients</NavLink>
      <NavLink to="/item" className={location.pathname === '/item' ? 'text-yellow-500' : 'hover:text-gray-300'}>Articles</NavLink>
    </nav>
  );
};

export default BottomNavbar;