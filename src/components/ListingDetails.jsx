import React, { useEffect, useState } from "react";
import picture from "../assets/jpg/picture.jpg";
import owl from "../assets/jpg/owl.png";
import profile from "../assets/svg/profile.svg";
import { preferenceList } from "../assets/prefs";
import MultipleSelectCard from "./MultipleSelectCard";
import sendreq from "../assets/svg/sendreq.svg";
import address from "../assets/svg/address.svg";
import { useNavigate, useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import Spinner from "./Spinner";
import { amenitiesList } from "../assets/amenities";
import ImageSlider from "./ImageSlider";



const ListingDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();
  const [listing, setListing] = useState({});
  const [loading, setLoading] = useState(true);
  const [image , setImage] = useState([])
  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setListing(docSnap.data());
        console.log(docSnap.data());
        setLoading(false);
      }
    };
    fetchListing();
  }, [navigate, params.listingId]);

  const [prefList, setPrefList] = useState(preferenceList);
  const onClick = (index) => {
    let prefs = [...prefList];
    let selectedPref = { ...prefs[index], selected: !prefs[index].selected };
    prefs[index] = selectedPref;
    setPrefList(prefs);
    setImage(listing.imgUrls)
  };
  if (loading) {
    return <Spinner />;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="listingdetail">
        <div className="listingdetasilinside">
          <div className="listingProfileCard">
            <div className="listingImg">
              <img
                src={profile}
                style={{ width: "100%", borderRadius: "50px" }}
              />
              <p>{listing.name}</p>
            </div>
            <div className="listingPhone">
              <img src={address} style={{ width: "60px" }} />
              <p>{listing.loc}</p>
              <button className="listingButton">
                <img src={sendreq} /> Send Request
              </button>
            </div>
          </div>

          <hr />

    
          <h3>Basic Info</h3>
          <div className="listingProfile">
            <div className="listingInfo">
              <p>Gender</p>
              <h3>Male</h3>
            </div>
            <div className="listingInfo">
              <p>Approx Rent</p>
              <h3>₹ {listing.rent}</h3>
            </div>
            <div className="listingInfo">
              <p>Occupancy</p>
              <h3>{listing.occupancy}</h3>
            </div>
            <div className="listingInfo">
              <p>Looking For</p>
              <h3>{listing.genderPreference}</h3>
            </div>
          </div>

          <hr></hr>

          <h3>Pictures</h3>
          <ImageSlider images={listing.imgUrls}/>
         

          <hr></hr>

          <h3>Preferences</h3>
          <div className="listingPref">
            {prefList.map((project, index) => {
              return (
                <MultipleSelectCard
                  project={project}
                  index={index}
                  isDetailedView={true}
                  onClick={() => {}}
                />
              );
            })}
          </div>

          <hr></hr>
          <h3>Amenities</h3>
          <div className="listingPref">
            {listing.amenities.map((title, index) => {
              return (
                <MultipleSelectCard
                  project={
                    amenitiesList.filter((value) => value.title === title)[0]
                  }
                  index={index}
                  isDetailedView={true}
                  onClick={() => {}}
                />
              );
            })}
          </div>
          <hr></hr>
          <h3>Description</h3>
          <p>{listing.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
