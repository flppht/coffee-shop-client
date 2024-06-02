import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CoffeeShopPage from "./components/CoffeeShopPage";
import BarmanPage from "./components/BarmanPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CoffeeShopPage />} />
        <Route path="/barman" element={<BarmanPage />} />
      </Routes>
    </Router>
  );
}

export default App;
