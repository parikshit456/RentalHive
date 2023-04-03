import React, { useState } from "react";
import { users } from "../assets/user";
import ListingCard from "./ListingCard";
import ListingNavbar from "./ListingNavbar";

const Listings = () => {
  const [userlist, setUserList] = useState(users);
  const [type, setType] = useState("all");
  const accodomationType = (type) => {
    console.log(type);
    type !== "" && setType(type);
    let list = userlist;
    if (type !== "all") {
      list = users.filter((user) => user.accommodation === type);
      setUserList(list);
    } else {
      setUserList(users);
    }
  };
  return (
    <div>
      <ListingNavbar accodomationType={accodomationType} />
      <div className="listing-partition"></div>
      <div className="listings">
        {userlist.map((user) => {
          console.log(user);
          console.log(type);
          // if (type === "all") {
          //   return <ListingCard user={user} />;
          // }
          // if (type === "Flat") {
          //   return user.accommodation === "Flat" && <ListingCard user={user} />;
          // }
          return <ListingCard user={user} />;
        })}
      </div>
    </div>
  );
};

export default Listings;
