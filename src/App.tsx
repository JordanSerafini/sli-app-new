import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/provider/dataProvider";

import Home from "./pages/home";

function App() {

  return (
    <>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </DataProvider>
      </>
  )
}

export default App
