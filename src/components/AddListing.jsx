import React from "react";
import "../../src/App.css";
import addListingImage from "../assets/jpg/add-listing-image.jpg"

import buildingSvg from "../assets/svg/building.svg";
import roomMate from "../assets/svg/roommate.svg";


import { Link } from "react-router-dom";


const AddListing = () => {
  return (
    <div className="add-listing">
      <h1 className="requirement-heading">List your Requirement</h1>
      <hr className="horizontal-line" />
      <p
        style={{
          fontSize: ".85rem",
          lineHeight: "1rem",
          color: "rgb(205, 205, 206",
        }}
      >
        It will take less than one minute
      </p>
      <div className="add-listing-content">
        <div className="svg1">
          <img
            src={addListingImage}
            className="addImage"
            alt="Add List Photo"
          />
        </div>
        <div>
          <div className="list-card">
            <img src={roomMate} alt="Building" className="building-img" />

          <Link to="/have-flat">
            <div className="option1">
              <h5>Have Flat</h5>
              <p className="desc1">Looking for flatmate</p>
            </div>
            </Link>
          </div>
          <div className="list-card2">
            <img src={buildingSvg} alt="Building" className="building-img2" />

            <div className="option1">
              <h5>Need Flat</h5>
              <p className="desc1">Looking for flat with flatmate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddListing;
