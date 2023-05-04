import React, { Suspense, useState } from "react";
import house_search from "../assets/svg/house_search.svg";
import location_icon from "../assets/svg/location_icon.svg";
import TextInputField from "./TextInputField";
import { cityList } from "../assets/cityList";
import { ToastContainer } from "react-toastify";
import LocationPicker from "./LocationPicker";
import SearchBar from "./SearchBar";
import Footer from "./Footer";

const Explore = () => {
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);

    setSearchTerm(event.target.value);
    const results = cityList.filter((city) =>
      city.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchResults(results);
  };
  return (
    <div className="explore-container">
      <div className="explore">
        <div className="explore-left">
          <div className="explore-tagline">
            Find <span>Like-Minded</span> <br /> Roommates & PGs
          </div>
          <div className="sub-tagline">
            Share your room with right roommates
          </div>
          <SearchBar
            handleInputChange={handleInputChange}
            icon={location_icon}
          />
          <ul className="suggestion-list">
            {searchTerm !== "" &&
              searchResults.slice(0, 4).map((result) => (
                <li key={result.id}>
                  {result.name}, {result.state}
                </li>
              ))}
          </ul>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="explore-right">
            <img src={house_search} alt="" />
          </div>
        </div>
        <ToastContainer />
      </div>
      <ToastContainer />
      <div style={{ backgroundColor: "rgb(249,255,249)", paddingTop: "30px" }}>
        <h1 className="location-header">
          <span>Choose the city</span> you'll be living in next
        </h1>
        <LocationPicker />
      </div>
      <Footer/>
    </div>
  );
};

export default Explore;
