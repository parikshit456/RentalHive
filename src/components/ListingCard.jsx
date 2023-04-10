import React from "react";
import location_icon from "../assets/svg/location_icon.svg";

const ListingCard = ({ user }) => {
  const { name, location, rent, gender, match_percentage } = user;
  return (
    <div className="listing-card">
      <div className="card-top">
        <img
          className="card-img"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
        />
        <div className="card-info">
          <div className="card-name">{name}</div>
          <div className="card-loc">{location}</div>

          <div className="card-pref">
            <div className="card-rent">
              <div className="rent">Rent</div>
              <div className="amount">₹ {rent}</div>
            </div>
            <div className="sub-card-pref">
              {" "}
              <div className="gender">
                <div className="gender-head">Looking for</div>
                <div>{gender}</div>
              </div>
              <div className="looking-for">
                <div className="looking-head">Looking for</div>
                <div>Roommate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-bottom">
        <div className="distance">0 km from your search</div>
        <div>
          {" "}
          <div className="match">{match_percentage}% Match</div>
          <div className="chat"></div>
          <div className="call"></div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
