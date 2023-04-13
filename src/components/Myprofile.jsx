import { async } from "@firebase/util";
import { getAuth } from "firebase/auth";
import { doc, Firestore, getDoc, updateDoc } from "firebase/firestore";

import React, { useEffect, useState } from "react";
import { db } from "../firebase.config";
import SelectInputField from "./SelectInputField";
import Spinner from "./Spinner";

const Myprofile = () => {
  const [gender, setGender] = useState(false);

  const [editGender, setEditGender] = useState(false);
  const genderList = ["Male", "Female"];
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  const user = auth.currentUser;
  // let fullName = "";
  // fullName = auth?.currentUser?.displayName;
  // var space = fullName?.indexOf(" ");
  // const fName = fullName?.substring(0, space);
  // const lName = fullName?.substring(space);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    myGender: "",
  });

  const getSelectedValue = () => {};

  const { firstName, lastName, contact = "", myGender = "" } = profileData;

  useEffect(() => {
    console.log(user);

    const fetchData = async () => {
      console.log(auth?.currentUser);
      const docRef = doc(db, "users", auth?.currentUser?.uid);
      console.log(docRef);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());
      if (docSnap.exists()) {
        setLoading(true);
        console.log(docSnap.data());
        const { name, mobile, myGender } = docSnap.data();
        console.log(profileData);
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
    const docRef = doc(db, "users", user?.uid);
    let fullname = firstName.trim() + " " + lastName.trim();
    await updateDoc(docRef, {
      name: fullname,
      mobile: contact,
      myGender: myGender,
    });
  };

  const onMutate = (e) => {
    let boolean = null;
    console.log(e.target.value);
    setGender(e.target.value);
    console.log(e.target.value);
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
    console.log(e.target.name);
    setProfileData({
      ...profileData,
      myGender: e.target.name,
    });
    console.log(profileData);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
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
                // onChange={onMutate}
              />
            </div>
            <div>
              <div className="item4">
                <div style={{ marginRight: "340px" }}>Gender</div>
                <button
                  // className="formButtonActive btn1"
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
                  // className="formButton"
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
            {/* <SelectInputField
              selectList={genderList}
              tagline={"Occupancy"}
              getSelectedValue={getSelectedValue}
              fieldType="occupancy"
            /> */}
          </form>
        </div>
        <button className="submitButton1" onClick={handleSave}>
          Save Changes
        </button>
        <hr />
      </div>
    </div>
  );
};

export default Myprofile;
