import React from "react";
import house_search from "../assets/svg/house_search.svg";
import location_icon from "../assets/svg/location_icon.svg";
import TextInputField from "./TextInputField";
const Explore = () => {
  return (
    <div className="explore">
      <div className="explore-left">
        <div className="explore-tagline">
          Find <span>Like-Minded</span> <br /> Roommates & PGs
        </div>
        <div className="sub-tagline">Share your room with right roommates</div>
        <TextInputField placeholder={"Search Places..."} icon={location_icon} />
      </div>
      <div className="explore-right">
        <img src={house_search} alt="" />
      </div>
    </div>
  );
};

export default Explore;
