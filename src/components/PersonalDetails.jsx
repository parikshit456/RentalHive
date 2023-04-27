import React, { useState } from "react";

import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const PersonalDetails = ({ setData }) => {
  const [gender, setGender] = useState();
  const [num, setNum] = useState();
  const [inputError, setInputError] = useState("");
  const[inputErrorCity,setInputErrorCity] = useState("")
  const[inputErrorLookingFor,setInputErrorLookingFor] = useState('')

  const [personaldetailForm, setPersonalDetailForm] = useState({
    lookingFor: "Looking for Flat/Flatmate/PG",
    myGender: "Female",
    city: "",
    // mobile: "",
  });

  const { lookingFor, myGender, city } = personaldetailForm;

  const auth = getAuth();
  const navigate = useNavigate();

  const onMutate = (e) => {
    setPersonalDetailForm({
      ...personaldetailForm,
      [e.target.name]: e.target.value,
    });
    if (e.target.value === "true") {
      setPersonalDetailForm({
        ...personaldetailForm,
        myGender: "Male",
      });
      setGender(true);
    }
    if (e.target.value === "false") {
      setPersonalDetailForm({
        ...personaldetailForm,
        myGender: "Female",
      });
      setGender(false);
    }

   
  };

  const number = {
    mobile: num,
  };

  const onClick = (e) => {
    e.preventDefault();
    setData({ ...personaldetailForm, ...number });

    const value =num?.length??0 
    console.log(value);
    if(value<12)
    {
      setInputError("Input a valid phone number")
    }

    if(city===""){
      console.log(city);
      setInputErrorCity('Please select a city')
      
    }

    if(city && value===12){
      navigate("/prefs")
    }

    // if(lookingFor === "Looking for Flat/Flatmate/PG"){

    //   console.log(lookingFor);
    //   setInputErrorLookingFor("Please select your preference")


    // }
    
    // setInputError('');
    // setInputErrorCity('')
    // setInputErrorLookingFor('')
    // navigate("/pref")

    // If user, doesn,t exist, create user
    //   if (!docSnap.exists()) {
    //     await setDoc(doc(db, "users", user.uid), {
    //       name: user.displayName,
    //       email: user.email,
    //       timeStamp: serverTimestamp(),
    //     });
    //   }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="personaldetailForm">
        <h3 style={{ textAlign: "center", fontSize: "30px" }}>
          Personal Details
        </h3>
        <hr />
        <div className="option">
          <p>You are</p>
          <select name="lookingFor" className="dropdown" onClick={onMutate}>
            <option value="Looking for Flat/Flatmate/PG">
              Looking for Flat/Flatmate/PG
            </option>
            <option value="Flat Owner">Flat Owner</option>
            <option value="PG Owner">PG Owner</option>
          </select>
        </div>
        {inputErrorLookingFor && (
        <div style={{ color: 'red' }}>
          {inputErrorLookingFor}
        </div>
      )}

        <div className="option">
          <p>Your Gender</p>
          <div style={{ display: "flex" }} className="gender-button">
            <button
              className={gender ? "formButtonActive" : "formButton"}
              type="button"
              name="myGender"
              value={true}
              onClick={onMutate}
            >
              Male
            </button>
            <button
              className={
                !gender && gender !== null ? "formButtonActive" : "formButton"
              }
              name="myGender"
              type="button"
              value={false}
              onClick={onMutate}
              style={{ marginRight: "50px" }}
            >
              Female
            </button>
          </div>
        </div>
        <div className="option">
          <p>In which city you are looking for?</p>
          <select name="city" className="dropdown" onChange={onMutate}>
            <option value="" disabled selected>
              Select your city
            </option>
            <option value="Chennai">Chennai</option>
            <option value="Banglore">Banglore</option>
            <option value="Gandhinagar">Gandhinagar</option>
          </select>
          {inputErrorCity && (
        <div style={{ color: 'red' }}>
          {inputErrorCity}
        </div>
      )}
        </div>
       
        <div className="option">
          <p>Your Mobile Number</p>
          <div className="phone-number">
          {/* <label htmlFor="">Add Your Location*</label> */}
           
            <PhoneInput
              name="mobile"
              value={num}
              onChange={setNum}
              country={"in"}
              containerStyle={{ height: "34px" }}
              inputStyle={{
                width: "100%",
                borderRadius: "5px",
                backgroundColor: "rgb(243, 244, 246)",
              }}
              inputClass="phone-number"
              disableDropdown="false"
              placeholder="+91 99999-99999"
            />
               {inputError && (
        <div style={{ color: 'red' }}>
          {inputError}
        </div>
      )}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="prefBtn" onClick={onClick}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
