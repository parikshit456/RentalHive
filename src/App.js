import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Explore from "./components/Explore";
import LocationPicker from "./components/LocationPicker";
import Listings from "./components/Listings";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import PersonalDetails from "./components/PersonalDetails";
import Pref from "./components/Pref";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/choose-location" element={<LocationPicker />} />
          <Route path='/Signin' element={<Signin/>}/>
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/PersonalDetails' element={<PersonalDetails/>}/>
          <Route path='/Pref' element={<Pref/>}/>
          <Route path="/listings" element={<Listings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
