import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextInputField from "./TextInputField";
import location_icon from "../assets/svg/location_icon.svg";
import SelectInputField from "./SelectInputField";
import upload from "../assets/svg/upload.svg";
import { amenitiesList } from "../assets/amenities";
import MultipleSelectCard from "./MultipleSelectCard";

const FlatForm = () => {
  const location = useLocation();
  const type = location.pathname;
  const navigate = useNavigate();

  const genderList = ["Male", "Female", "Any"];
  const occupancyList = ["Single", "Shared", "Any"];
  var curr = new Date();
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substring(0, 10);

  const [utilityList, setUtilityList] = useState(amenitiesList);
  const onClick = (index) => {
    let utilities = [...utilityList];
    let selectedUtility = {
      ...utilities[index],
      selected: !utilities[index].selected,
    };
    utilities[index] = selectedUtility;
    setUtilityList(utilities);
  };

  return (
    <div className="flat-form">
      <div className="flat-type">
        <button
          onClick={() => navigate("/have-flat")}
          className={
            type === "/have-flat" ? "have-flat-btn-active" : "have-flat-btn"
          }
        >
          Have Flat
        </button>
        <button
          onClick={() => navigate("/need-flat")}
          className={
            type === "/need-flat" ? "need-flat-btn-active" : "need-flat-btn"
          }
        >
          Need Flat
        </button>
      </div>
      <div className="form-content">
        <h2 className="form-header">
          {type === "/have-flat" ? "Have" : "Need"} Flat
        </h2>
        <h6 className="form-subheader">If you are looking for flatmate.</h6>
        <div className="form-partition"></div>

        <form className="form-main">
          <div className="form-row">
            <div>
              {" "}
              <label htmlFor="">Add Your Location*</label>
              <TextInputField
                className="form-location"
                placeholder={"Add Location..."}
                icon={location_icon}
                type="icon"
              />
            </div>
            <SelectInputField selectList={genderList} tagline={"Looking For"} />
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="">Approx Rent*</label>

              <TextInputField
                className="form-location"
                placeholder={"5000"}
                type="text"
                icon="₹"
              />
            </div>
            <SelectInputField
              selectList={occupancyList}
              tagline={"Occupancy"}
            />
          </div>
          {type === "/have-flat" && (
            <div>
              <label htmlFor="">Upload 3 Photos of your flat</label>
              <div className="upload-image">
                <input type="file" name="file" id="file" class="inputfile" />
                <label for="file" className="upload-btn">
                  <img src={upload} />
                  Click to upload Image
                  <input
                    type="file"
                    className="formInputFile"
                    id="images"
                    // onChange={onMutate}
                    max="6"
                    accept=".jpg,.png,.jpeg"
                    multiple
                    required
                  />
                  <p>(JPG, PNG, JPEG)</p>
                </label>
              </div>
              <label style={{ fontSize: "12px", fontWeight: "600" }} htmlFor="">
                {" "}
                You can upload images upto 25 MB
              </label>
            </div>
          )}

          <div className="form-row-date">
            <div>
              <label htmlFor="">Contact Number*</label>

              <TextInputField
                className="form-location"
                placeholder={"9999 999 999"}
                type="text"
                icon="+91"
              />
            </div>

            <div className="form-date">
              <label for="start">
                {type === "/have-flat" ? "Availaible from" : "Shift from"}
              </label>

              <input
                type="date"
                id="start"
                name="trip-start"
                defaultValue={date}
              />
            </div>
          </div>

          {type === "/have-flat" && (
            <div className="amenities">
              <label htmlFor="">Amenities</label>
              <div className="amenities-list">
                {utilityList.map((utility, index) => {
                  return (
                    <MultipleSelectCard
                      project={utility}
                      index={index}
                      onClick={onClick}
                    />
                  );
                })}
              </div>
            </div>
          )}
          <div className="form-desc">
            <label htmlFor="">Description*</label>
            <textarea
              name=""
              id=""
              placeholder="I am looking for a roommate for my flat."
            ></textarea>
          </div>
          <div className="submit-btn">
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FlatForm;
