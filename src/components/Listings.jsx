import React, { useEffect, useState } from "react";
import { users } from "../assets/user";
import ListingCard from "./ListingCard";
import ListingNavbar from "./ListingNavbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase.config";
import {
  getDoc,
  doc,
  collection,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";

const Listings = () => {
  const [userlist, setUserList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [type, setType] = useState("all");

  const auth = getAuth();
  console.log(auth);

  const [listing, setListing] = useState({});
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const navigate = useNavigate();

  const accodomationType = (type) => {
    console.log("--->" + type);
    type !== "" && setType(type);
    let list = userlist;
    if (type !== "all") {
      list = userlist.filter((user) => {
        return user.data.clientType === type;
      });
      console.log(list);
      setFilterList(list);
    } else {
      setUserList(userlist);
    }
  };
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listingsRef = collection(db, "listings");
        console.log(listingsRef);
        //query
        const q = query(listingsRef);
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          console.log(doc);
          listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setUserList(listings);
        console.log(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listings");
      }
    };
    fetchListing();
  }, [navigate, params.listingId]);
  return (
    <div>
      <ListingNavbar accodomationType={accodomationType} />
      <div className="listing-partition"></div>
      <div className="listings">
        {(type !== "all" ? filterList : userlist).map((user) => {
          return <ListingCard user={user} />;
        })}
      </div>
    </div>
  );
};

export default Listings;
