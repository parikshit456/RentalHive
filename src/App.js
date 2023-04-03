import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Explore from "./components/Explore";
import LocationPicker from "./components/LocationPicker";
import Listings from "./components/Listings";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/choose-location" element={<LocationPicker />} />
          <Route path="/listings" element={<Listings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
