import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/provider/dataProvider";

import Home from "./pages/home";
import CustomerPage from "./pages/customer/customerPage";
import ItemPage from "./pages/item/itemPage";

import BottomNavbar from "./component/nav/bottomNavBar";

function App() {
  return (
    <>
      <DataProvider>
        <Router>
          <div className="bg-gray-200 h-screen w-screen flex flex-col justify-center items-center ">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/customer" element={<CustomerPage />} />
              <Route path="/item" element={<ItemPage />} />
            </Routes>
          </div>
          <BottomNavbar  />
        </Router>
      </DataProvider>
    </>
  );
}

export default App;
