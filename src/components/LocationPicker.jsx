import React from "react";
import { cities } from "../assets/cities";
import CityCard from "./CityCard";

const LocationPicker = () => {
  const cityList = cities;
  return (
    <div className="location-picker">
      {cityList.cities.map((city) => {
        return <CityCard city={city} />;
      })}
    </div>
  );
};

export default LocationPicker;
