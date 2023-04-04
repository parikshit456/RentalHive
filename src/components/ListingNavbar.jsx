import React, { useState } from "react";
import location_icon from "../assets/svg/location_icon.svg";
import house_search from "../assets/svg/house_search.svg";
import TextInputField from "./TextInputField";

const ListingNavbar = ({ accodomationType }) => {
  const [type, setType] = useState("all");
  const typeFunc = (typeValue) => {
    setType(typeValue);
    accodomationType(typeValue);
  };
  return (
    <div className="listing-nav">
      <ul className="list-types">
        <li
          className={type === "all" ? "list-active" : ""}
          onClick={() => typeFunc("all")}
        >
          All Listings
        </li>
        <li
          className={type === "Flat" ? "list-active" : ""}
          onClick={() => typeFunc("Flat")}
        >
          Have Flat
        </li>
        <li
          className={type === "Need Flat" ? "list-active" : ""}
          onClick={() => typeFunc("Need Flat")}
        >
          Need Flat
        </li>
        <li
          className={type === "PG" ? "list-active" : ""}
          onClick={() => typeFunc("PG")}
        >
          PG
        </li>
      </ul>
      <TextInputField placeholder={"Search Places..."} icon={location_icon} />
    </div>
  );
};

export default ListingNavbar;
