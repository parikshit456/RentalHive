import React, { useState } from "react";
import house_search from "../assets/svg/house_search.svg";
import location_icon from "../assets/svg/location_icon.svg";
import TextInputField from "./TextInputField";
import { cityList } from "../assets/cityList";
import { ToastContainer } from "react-toastify";
const Explore = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);

    setSearchTerm(event.target.value);
    const results = cityList.filter((city) =>
      city.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchResults(results);

    // if (event.target.value.length > 4) {
    //   fetch(
    //     // `https://nominatim.openstreetmap.org/search?q=${event.target.value}&format=json`
    //     `https://us1.locationiq.com/v1/autocomplete.php?key=pk.562b03e1a2f2f410ff0b9b406766bbbd&q=${event.target.value}&countrycodes=in&limit=5&format=json`
    //   )
    //     .then((response) => response.json())
    //     .then((data) => {
    //       setSuggestions(data);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //       setSuggestions([]);
    //     });
    // } else {
    //   setSuggestions([]);
    // }
  };
  return (
    <div className="explore">
      <div className="explore-left">
        <div className="explore-tagline">
          Find <span>Like-Minded</span> <br /> Roommates & PGs
        </div>
        <div className="sub-tagline">Share your room with right roommates</div>
        <TextInputField
          handleInputChange={handleInputChange}
          placeholder={"Search Places..."}
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
        {/* <ul className="suggestion-list">
          {suggestions.length > 0 &&
            suggestions.map((suggestion) => (
              <li key={suggestion.place_id}>{suggestion.display_name}</li>
            ))}
        </ul> */}
      </div>
      <div className="explore-right">
        <img src={house_search} alt="" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Explore;
