import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/provider/dataProvider";

import Home from "./pages/home";
import CustomerPage from "./pages/customer/customerPage";

function App() {
  return (
    <>
      <DataProvider>
        <Router>
          <div className="bg-mainBG2 h-screen w-screen flex flex-col justify-center items-center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/customer" element={<CustomerPage />} />
            </Routes>
          </div>
        </Router>
      </DataProvider>
    </>
  );
}

export default App;
