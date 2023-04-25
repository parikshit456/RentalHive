import React, { useEffect, useState } from "react";
import { users } from "../assets/user";
import ListingCard from "./ListingCard";
import ListingNavbar from "./ListingNavbar";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
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
  const location = useLocation();

  const auth = getAuth();

  const [listing, setListing] = useState({});
  const [loading, setLoading] = useState(true);
  const { name } = location.state.value;
  const params = useParams();
  const navigate = useNavigate();

  const accodomationType = (type) => {
    type !== "" && setType(type);
    let list = userlist;
    if (type !== "all") {
      list = userlist.filter((user) => {
        return user.data.clientType === type;
      });
      setFilterList(list);
    } else {
      setUserList(userlist);
    }
  };
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listingsRef = collection(db, "listings");
        //query
        const q = query(listingsRef);
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setUserList(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listings");
      }
    };
    fetchListing();
  }, [navigate, params.listingId]);
  return (
    <div>
      <ListingNavbar accodomationType={accodomationType} cityName={name} />
      <div className="listing-partition"></div>
      <div className="listings">
        {(type !== "all" ? filterList : userlist).map((user) => {
          return (
            user?.data?.city?.toLowerCase() === name?.toLowerCase() && (
              <ListingCard user={user} />
            )
          );
        })}
      </div>
    </div>
  );
};

export default Listings;
