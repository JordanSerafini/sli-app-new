import { NavLink, useLocation } from 'react-router-dom';

import Icon from "../../component/svg/Icon";


const BottomNavbar = () => {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <nav className="bg-gray-light text-dark-light fixed bottom-0 left-0 right-0 flex justify-around p-4 h-1/10 w-full items-center">
      <NavLink to="/customer" className={location.pathname === '/' ? '' : ''}>
        <Icon type="Account_Circle"  />
        Clients
      </NavLink>
      <NavLink to="/item" className={location.pathname === '/item' ? 'text-yellow-500' : 'hover:text-gray-300'}>Articles</NavLink>
    </nav>
  );
};

export default BottomNavbar;
