import React from "react";
import picture from "../assets/jpg/picture.jpg";
import owl from "../assets/jpg/owl.png";
import profile from "../assets/svg/profile.svg";
import { preferenceList } from "../assets/prefs";
import MultipleSelectCard from "./MultipleSelectCard";
import sendreq from "../assets/svg/sendreq.svg";
import address from "../assets/svg/address.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import SwiperCore, { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper";
import ImageSlider from "./ImageSlider";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y,Autoplay]);

const images = [
  "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80",
  
 "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  
 "https://images.unsplash.com/photo-1536782376847-5c9d14d97cc0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80"
];

console.log(images);

const ListingDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();
  const [listing, setListing] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchListing = async () => {
      console.log(params);
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
  console.log(listing.useRef);

  const [prefList, setPrefList] = useState(preferenceList);
  const onClick = (index) => {
    let prefs = [...prefList];
    let selectedPref = { ...prefs[index], selected: !prefs[index].selected };
    prefs[index] = selectedPref;
    setPrefList(prefs);
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
          </div>

          <hr />

          <h3>Basic Info</h3>
          <div className="listingProfile">
            <div className="listingInfo">
              <p>Gender</p>
              <h3>Male</h3>
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
          <img
            src={listing.imgUrls[0]}
            style={{ width: "50%", height: "250px" }}
          />

          <hr></hr>

          <h3>Preferences</h3>
          <div className="listingPref">
            {prefList.map((project, index) => {
              return (
                <MultipleSelectCard
                  project={project}
                  index={index}
                  isDetailedView={true}
                  onClick={onClick}
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
