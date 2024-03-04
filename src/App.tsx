import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/provider/dataProvider";

import Home from "./pages/home";
import CustomerPage from "./pages/customer/customerPage";
import itemPage from "./pages/item/itemPage";

function App() {
  return (
    <>
      <DataProvider>
        <Router>
          <div className="bg-mainBG2 h-screen w-screen flex flex-col justify-center items-center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/customer" element={<CustomerPage />} />
              <Route path="/item" element={<itemPage />} />
            </Routes>
          </div>
        </Router>
      </DataProvider>
    </>
  );
}

export default App;
