import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CoffeeShopPage from "./components/CoffeeShopPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CoffeeShopPage />} />
      </Routes>
    </Router>
  );
}

export default App;
