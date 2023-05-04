import React, { useEffect, useState } from "react";
import picture from "../assets/jpg/picture.jpg";
import owl from "../assets/jpg/owl.png";
import profile from "../assets/svg/profile.svg";
import { preferenceList } from "../assets/prefs";
import MultipleSelectCard from "./MultipleSelectCard";
import whatsapp from "../assets/svg/whatsapp.svg";
import address from "../assets/svg/address.svg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import Spinner from "./Spinner";
import { amenitiesList } from "../assets/amenities";
import ImageSlider from "./ImageSlider";
import ReactWhatsapp from "react-whatsapp";
import Footer from "./Footer";
import Signin from "./Signin";

const ListingDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();
  const [listing, setListing] = useState({});
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState([]);
  const [userPrefList,setUserPrefList] = useState([])

  const location = useLocation();
  let type = location.pathname;
  type = type.substring(1);

  
  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setListing(docSnap.data());
        setLoading(false);
      }


      const userDocRef = doc(db, "users", docSnap.data().userID);
      const userDocSnap = await getDoc(userDocRef);
      console.log(userDocSnap.data())
      if (userDocSnap.exists()) {
        setLoading(true);
        console.log(userDocSnap.data())
        const { prefList } = userDocSnap.data();
        setUserPrefList(prefList)
        setLoading(false);
      }

   
    };
    fetchListing();
  }, [navigate, params.listingId]);
console.log(userPrefList)
  const [prefList, setPrefList] = useState(preferenceList);
  const onClick = (index) => {
    let prefs = [...prefList];
    let selectedPref = { ...prefs[index], selected: !prefs[index].selected };
    prefs[index] = selectedPref;
    setPrefList(prefs);
    setImage(listing.imgUrls);
  };
  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
    {auth?.currentUser ? <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="listingdetail">
        <div className="listingdetasilinside">
          <div className="listingProfileCard">
            <div className="listingImg">
              <img
                src={listing.userProfile}
                style={{ width: "100%", borderRadius: "50px" }}
              />
              <p>{listing.name}</p>
            </div>
            <div className="listingPhone">
              <img src={address} style={{ width: "60px" }} />
              <p>{listing.loc}</p>
              <ReactWhatsapp
                number={listing.contactNumber}
                message="Hello World!!!"
                className="whatsapp"
              >
                <img src={whatsapp} style={{ width: "40px" }} />
                Send Request
              </ReactWhatsapp>
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

          {listing.clientType === "have-flat" && (
            <div>
              <h3>Pictures</h3>
              <ImageSlider images={listing.imgUrls} />
              <hr></hr>
            </div>
          )}

          <h3>Preferences</h3>
          <div className="listingPref">
            {userPrefList.map((title, index) => {
              return (
                <MultipleSelectCard
                  project={preferenceList.filter(
                    (value) => value.title === title
                  )[0]}
                  index={index}
                  isDetailedView={true}
                  onClick={() => {}}
                />
              );
            })}
          </div>
          <hr></hr>

          {listing.clientType === "have-flat" && (
            <div>
              <h3>Amenities</h3>
              <div className="listingPref">
                {listing.amenities.map((title, index) => {
                  return (
                    <MultipleSelectCard
                      project={
                        amenitiesList.filter(
                          (value) => value.title === title
                        )[0]
                      }
                      index={index}
                      isDetailedView={true}
                      onClick={() => {}}
                    />
                  );
                })}
              </div>
              <hr></hr>
            </div>
          )}

          <h3>Description</h3>
          <p>{listing.desc}</p>
        </div>
      </div>
      
    </div> : navigate("/Signin") }
    <Footer/>
    </div>
  );
};

export default ListingDetails;
