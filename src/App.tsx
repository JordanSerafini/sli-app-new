import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { DataProvider } from "./context/provider/dataProvider";

import Home from "./pages/home";
import CustomerPage from "./pages/customer/customerPage";
import ItemPage from "./pages/item/itemPage";
import Login from "./pages/login";
import StockDocPage from "./pages/stock/stockDocPage";
import Charts from "./pages/stats/statsPage";


function Layout() {
  const location = useLocation(); 
  const token = localStorage.getItem("token");

  return (
    <>
      {token? ( 
        <div className="bg-gray-200 h-screen w-screen flex flex-col justify-center items-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/customer" element={<CustomerPage />} />
            <Route path="/item" element={<ItemPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/stock" element={<StockDocPage />} />
            <Route path="/charts" element={<Charts />} />
          </Routes>
        </div>
      ) : (
        <>
          {location.pathname !== "/login" && alert("Veuillez-vous connecter")}
          <Login />
        </>
      )}
    </>
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
