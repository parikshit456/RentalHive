import { async } from "@firebase/util";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase.config";

const Myprofile = () => {
  const [gender, setGender] = useState();
  const auth = getAuth();

  const user = auth.currentUser;
  let fullName = "";
  fullName = auth?.currentUser?.displayName;
  var space = fullName?.indexOf(" ");
  var fName = fullName?.substring(0, space);
  var lName = fullName?.substring(space);
  const [profileData, setProfileData] = useState({
    firstName: fName,
    lastName: lName,
    contact: "",
    myGender: "",
  });

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
        console.log(docSnap.data());
        const { mobile, myGender } = docSnap.data();
        console.log(profileData);
        setProfileData({
          ...profileData,
          contact: mobile,
          myGender: myGender,
        });
      }
    };

    fetchData();
  }, [auth?.currentUser?.uid]);

  const onMutate = (e) => {
    if (e.target.value === "true") {
      setGender(true);
    }
    if (e.target.value === "false") {
      setGender(false);
    }
  };

  return (
    <div className="mainDiv">
      <div className="formDiv">
        <h1>Profile</h1>
        <hr />
        <div className="gridContainer">
          <form className="formContainer">
            <div>
              <div className="item1">First Name</div>
              <input type="text" placeholder="John" value={fName} />
            </div>
            <div>
              <div className="item2">Last Name</div>
              <input type="text" placeholder="Doe" value={lName} />
            </div>
            <div>
              <div className="item3">Contact Number</div>
              <input type="tel" placeholder="987654321" value={contact} />
            </div>
            <div>
              <div className="item4">
                <div style={{ marginRight: "340px" }}>Gender</div>
                <button
                  // className="formButtonActive btn1"
                  className={gender ? "formButtonActive1" : "formButton1"}
                  type="button"
                  value={true}
                  onClick={onMutate}
                >
                  Male
                </button>
                <button
                  // className="formButton"
                  className={
                    !gender && gender !== null
                      ? "formButtonActive1"
                      : "formButton1"
                  }
                  type="button"
                  value={false}
                  onClick={onMutate}
                >
                  Female
                </button>
              </div>
            </div>
          </form>
        </div>
        <button className="submitButton1">Save Changes</button>
        <hr />
      </div>
    </div>
  );
};

export default Myprofile;
