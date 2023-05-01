import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Profile from "./Profile";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import Spinner from "./Spinner";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase.config";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";
import edit from "../assets/svg/edit.svg";

const Navbar = ({ authUser }) => {
  const [isActive, setIsActive] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const auth = getAuth();
  const location = useLocation();
  const [listing, setListing] = useState([]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        setUser(null);

        // ...
      }
    });
  }, []);

  useEffect(() => {
    

    const fetchListing = async () => {
      try {
        const listingsRef = collection(db, "listings");
        //query
        const q = query(listingsRef);

        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          if (doc.data().userID === auth?.currentUser?.uid) {
            listings.push({
              id: doc.id,
              data: doc.data(),
            });
          }
          setListing(listings);
          setIsEdit(listings.length > 0);
        });
        // setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listings");
      }
    };
    fetchListing();
    const handleScroll = () => {
      // Check if user has scrolled beyond a certain threshold, e.g. 100px
      const threshold = 100;
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      setIsScrolled(scrollTop > threshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [auth?.currentUser?.uid]);

  const onSignin = () => {
    if (isActive) {
      setIsActive(!isActive);
    }

    navigate("/Signin");
  };

  const onSignup = () => {
    if (isActive) {
      setIsActive(!isActive);
    }

    navigate("/Signup");
  };
  const onLogoClick = () => {
    if (isActive) {
      setIsActive(!isActive);
    }

    navigate("/");
  };

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={isScrolled ? "fixed-header navbar" : "navbar"}>
      <div onClick={onLogoClick} className="navbar-logo">
        House<span>Hunter</span>
      </div>

      {user ? (
        <div className="btn-container">
          {/* <button className="navButton">Add Listing</button> */}
          <Link
            to={isEdit && listing.length > 0 ? "/EditListing" : "/add-listing"}
          >
            <button className="add-listing-btn">
              <img
                className="add-icon"
                alt="svgImg"
                src={
                  isEdit
                    ? "https://img.icons8.com/ios/50/null/edit--v1.png"
                    : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNjQiIGhlaWdodD0iNjQiCnZpZXdCb3g9IjAsMCwyNTYsMjU2IgpzdHlsZT0iZmlsbDojMDAwMDAwOyI+CjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxnIHRyYW5zZm9ybT0ic2NhbGUoOC41MzMzMyw4LjUzMzMzKSI+PHBhdGggZD0iTTQsMTZoMTB2MTBjMCwwLjU1MjI4IDAuNDQ3NzIsMSAxLDFjMC41NTIyOCwwIDEsLTAuNDQ3NzIgMSwtMXYtMTBoMTBjMC41NTIyOCwwIDEsLTAuNDQ3NzIgMSwtMWMwLC0wLjU1MjI4IC0wLjQ0NzcyLC0xIC0xLC0xaC0xMHYtMTBjMCwtMC41NTIyOCAtMC40NDc3MiwtMSAtMSwtMWMtMC41NTIyOCwwIC0xLDAuNDQ3NzIgLTEsMXYxMGgtMTBjLTAuNTUyMjgsMCAtMSwwLjQ0NzcyIC0xLDFjMCwwLjU1MjI4IDAuNDQ3NzIsMSAxLDF6Ij48L3BhdGg+PC9nPjwvZz4KPC9zdmc+"
                }
              />
              <span>{isEdit ? "Edit" : "Add"} Listing</span>
            </button>
          </Link>

          <Profile user={user} />
        </div>
      ) : (
        !user && (
          <div>
            <div className={isActive ? "navbar-list active" : "navbar-list"}>
              <div className="btn-container">
                <div onClick={onSignin} className="signin-btn">
                  Sign In
                </div>
                <div onClick={onSignup} className="signup-btn">
                  Sign Up
                </div>
              </div>
              <div className="download-btn">
                <button>Contact Us</button>
              </div>
            </div>

            <div
              className={`navbar-toggle ${isActive ? "open" : ""}`}
              onClick={toggleMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Navbar;
