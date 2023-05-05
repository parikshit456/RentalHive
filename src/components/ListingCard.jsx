import React from "react";
import { Link } from "react-router-dom";
import location_icon from "../assets/svg/location_icon.svg";
import location_icon1 from "../assets/svg/loc.svg";
import Spinner from "./Spinner";
import { getAuth } from "firebase/auth";
import chat from "../assets/svg/chat.svg"
import call from "../assets/svg/call.svg"

const ListingCard = ({ user }) => {
  const {
    name = "John doe",
    loc,
    rent,
    genderPreference,
    match_percentage,
    userProfile
  } = user.data;
  const auth = getAuth();

  if (!user) {
    return <Spinner />;
  }
  return (
    
      <div className="listing-card">
        <Link to={`/ListingDetails/${user.id}`}>
        <div className="card-top">
          <img className="card-img" src={userProfile} />
          <div className="card-info">
            <div className="card-name">{name}</div>
            <div style={{display: "flex"}}>
            <img src={location_icon1} style={{width:"13px" , paddingRight:"1px"}}/>
            <div className="card-loc">{loc}</div>
            </div>
           

            <div className="card-pref">
              <div className="card-rent">
                <div className="rent">Rent</div>
                <div className="amount">₹ {rent}</div>
              </div>
              <div className="sub-card-pref">
                {" "}
                <div className="gender">
                  <div className="gender-head">Looking for</div>
                  <div>{genderPreference}</div>
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
          <div className="distance">5 km from your search</div>
          <div>
            {" "}
            <div className="match">  
            <img src={chat} style={{width:"20px" , marginRight:"10px"}}/>
            <img src={call} style={{width:"20px"}}/>
            </div>
          </div>
        </div>
        </Link>
      </div>
    
    
  );
};

export default ListingCard;
