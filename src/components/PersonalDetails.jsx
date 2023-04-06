import React, { useState } from "react";

import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

const PersonalDetails = () => {
    const [gender , setGender] = useState()

    const onMutate = (e) => {
        if (e.target.value === 'true') {
            setGender(true)
        }
        if (e.target.value === 'false') {
            setGender(false)
        }
    }
  return (
    <div style={{display : "flex" , justifyContent : "center"}}>

    
    <div className="personaldetailForm">
      <h3 style={{textAlign : "center" , padding :"10px" , fontSize: "30px"}}>Personal Details</h3>
      <hr/>
      <div className="option">
        <p>You are</p>
        <select className="dropdown">
          <option value="#">Looking for Flat/Flatmate/PG</option>
          <option value="#">Flat Owner</option>
          <option value="#">PG Owner</option>
        </select>
      </div>
      
      <div className="option">
            <p>Gender</p>
            <div style={{display:'flex'}} className='gender-button'>
            <button
              className={gender ? 'formButtonActive' : 'formButton'}
              type='button'
              value={true}
              onClick={onMutate}
            >
              Male
            </button>
            <button
              className={!gender && gender !== null
                ? 'formButtonActive'
                : 'formButton'}
              type='button'
              value={false}
              onClick={onMutate}
              style={{marginRight : "50px"}}
            >
              Female
            </button>
            </div>
          </div>
      <div className="option">
        <p>In which city you are looking for?</p>
        <select className="dropdown" >
          <option value="#">Chennai</option>
          <option value="#">Banglore</option>
          <option value="#">Gandhinagar</option>
          <option value="#">Chennai</option>
          <option value="#">Banglore</option>
          <option value="#">Gandhinagar</option>
          <option value="#">Chennai</option>
          <option value="#">Banglore</option>
          <option value="#">Gandhinagar</option>
        </select>
      </div>
      <div className="option">
        <p>Your Mobile Number</p>
        <div style={{float:"right", marginTop:"10px"}}>
        <PhoneInput
                  country={"in"}
                  containerStyle={{height: "34px" }}
                  inputStyle={{width : "223px" , borderRadius: "5px",backgroundColor:"rgb(243, 244, 246)"}}
                  disableDropdown="false"
                  placeholder="+91 99999-99999"
                  className='phone-number'
               
                />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="prefBtn">Continue</button>
        </div>
    </div>
    </div>
    
  );
};

export default PersonalDetails;
