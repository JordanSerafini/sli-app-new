import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { DataProvider } from "./context/provider/dataProvider";

import Home from "./pages/home";
import CustomerPage from "./pages/customer/customerPage";
import ItemPage from "./pages/item/itemPage";
import Login from "./pages/login";

import BottomNavbar from "./component/nav/bottomNavBar";
import dataContext from "./context/context/dataContext";
import { useContext } from "react";

function Layout() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(dataContext);

  if (!isLoggedIn) {
    navigate('/login', { replace: true });
  
    return null; 
  }

  return (
    <div className="bg-gray-200 h-screen w-screen flex flex-col justify-center items-center">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/item" element={<ItemPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <BottomNavbar />
    </div>
  );
}

function App() {
  return (
    <DataProvider>
      <Router>
        <Layout />
      </Router>
    </DataProvider>
  );
}

export default App;
