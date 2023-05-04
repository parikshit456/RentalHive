import React from "react";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { cityList } from "../assets/cityList";
import location_icon from "../assets/svg/location_icon.svg";
import Navbar from "./Navbar";

const ExploreNew = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");

  const [searchResults, setSearchResults] = useState([]);
  const handleInputChange = (event) => {
    setQuery(event.target.value);

    setSearchTerm(event.target.value);
    const results = cityList.filter((city) =>
      city.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchResults(results);
  };
  const style = {
    width: "600px",
    backgroundColor: "rgba(255,255,255,0.7)",
  };
  return (
    <div
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1619810230359-b2c2f61c49cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        height: "87vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SearchBar
        style={style}
        handleInputChange={handleInputChange}
        icon={location_icon}
      />
    </div>
  );
};

export default ExploreNew;
