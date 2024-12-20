import { async } from "@firebase/util";
import { getAuth } from "firebase/auth";
import { doc, Firestore, getDoc, updateDoc } from "firebase/firestore";

import React, { useEffect, useState } from "react";
import { db } from "../firebase.config";
import Spinner from "./Spinner";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";
import Footer from "./Footer";

const Myprofile = () => {
  const [gender, setGender] = useState(false);

  const [editGender, setEditGender] = useState(false);
  const genderList = ["Male", "Female"];
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  const user = auth.currentUser;

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    myGender: "",
  });

  const getSelectedValue = () => {};

  const { firstName, lastName, contact = "", myGender = "" } = profileData;

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "users", auth?.currentUser?.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLoading(true);
        const { name, mobile, myGender } = docSnap.data();
        var space = name?.indexOf(" ");
        myGender === "Male" ? setGender(true) : setGender(false);
        setProfileData({
          firstName: name?.substring(0, space).trim(),
          lastName: name?.substring(space).trim(),
          contact: mobile,
          myGender: myGender,
        });
        setLoading(false);
      }
    };

    fetchData();
  }, [auth?.currentUser?.uid]);

  const handleSave = async () => {

    
    try{const docRef = doc(db, "users", user?.uid);
    let fullname = firstName.trim() + " " + lastName.trim();
      await updateDoc(docRef, {

      name: fullname,
      mobile: contact,
      myGender: myGender,
    });
    toast.success("Changed Successfully")
  }catch(err){
    console.log(err);
    
  }

    
  };

  const onMutate = (e) => {
    let boolean = null;
    setGender(e.target.value);
    if (e.target.value === "true") {
      boolean = true;
    }

    if (e.target.value === "false") {
      boolean = false;
    }

    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });

    //text/boolean/numbers
    if (!e.target.files) {
      setProfileData((prevState) => ({
        ...prevState,
        [e.target.name]: boolean ?? e.target.value,
      }));
    }
  };

  const OnSelect = (e) => {
    setProfileData({
      ...profileData,
      myGender: e.target.name,
    });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
    <div className="mainDiv">
      <div className="formDiv">
        <h1>Profile</h1>
        <hr />
        <div className="gridContainer">
          <form className="formContainer">
            <div>
              <div className="item1">First Name</div>
              <input
                type="text"
                name="firstName"
                placeholder="John"
                value={firstName}
                onChange={onMutate}
              />
            </div>
            <div>
              <div className="item2">Last Name</div>
              <input
                type="text"
                placeholder="Doe"
                name="lastName"
                value={lastName}
                onChange={onMutate}
              />
            </div>
            <div>
              <div className="item3">Contact Number</div>
              <input
                type="tel"
                placeholder="987654321"
                name="contact"
                value={contact}
              />
            </div>
            <div>
              <div className="item4">
                <div style={{ marginRight: "340px" }}>Gender</div>
                <button
                  className={
                    myGender === "Male" ? "formButtonActive1" : "formButton1"
                  }
                  name="Male"
                  type="button"
                  value={gender}
                  onClick={OnSelect}
                >
                  Male
                </button>
                <button
                  name="Female"
                  className={
                    myGender === "Female" ? "formButtonActive1" : "formButton1"
                  }
                  type="button"
                  value={gender}
                  onClick={OnSelect}
                >
                  Female
                </button>
              </div>
            </div>
          </form>
        </div>
        <button className="submitButton1" onClick={handleSave}>
          Save Changes
        </button>     
        <hr />
      </div>
      <ToastContainer />
    </div>
    </div>
  );
};

export default Myprofile;
