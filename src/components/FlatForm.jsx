import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextInputField from "./TextInputField";
import location_icon from "../assets/svg/location_icon.svg";
import SelectInputField from "./SelectInputField";
import upload from "../assets/svg/upload.svg";
import { amenitiesList } from "../assets/amenities";
import MultipleSelectCard from "./MultipleSelectCard";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";

import { getAuth, onAuthStateChanged } from "firebase/auth";
//import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../firebase.config";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { async } from "@firebase/util";
import { cityList } from "../assets/cityList";

const FlatForm = () => {
  const location = useLocation();
  let type = location.pathname;
  type = type.substring(1);

  const fileInputRef = useRef(null);
  const [lessonImage, setLessonImage] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  var curr = new Date();
  const auth = getAuth();
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substring(0, 10);
  const genderList = ["Male", "Female", "Any"];
  const occupancyList = ["Single", "Shared", "Any"];
  const [formData, setFormData] = useState({
    name: "",
    clientType: type,
    loc: "",
    genderPreference: "",
    rent: 0,
    occupancy: "",
    images: {},
    amenities: [],
    desc: "",
    contactNumber: "",
    city: "",
    userID: "",
    availableFrom: date,
    userProfile: auth?.currentUser?.photoURL
  });

  const {
    name,
    clientType,
    loc,
    city,
    userID,
    genderPreference,
    rent,
    occupancy,
    images,
    amenities,
    desc,
    contactNumber,
    availableFrom,
  } = formData;
  const [selectedUtilityList, setSelectedUtilityList] = useState([]);

  const [utilityList, setUtilityList] = useState(amenitiesList);
  const onClick = async (index) => {
    let utilities = [...utilityList];

    let selectedUtility = {
      ...utilities[index],
      selected: !utilities[index].selected,
    };

    utilities[index] = selectedUtility;
    setUtilityList(utilities);
    let amenitiesTempList = utilities.filter(
      (utility) => utility.selected === true
    );

    amenitiesTempList = amenitiesTempList.map((element) => {
      return element.title;
    });
    setFormData({
      ...formData,
      clientType: type,
      amenities: [...amenitiesTempList],
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    let formDataCopy = {
      ...formData,
      name: auth?.currentUser?.displayName,
    };
    if (type === "have-flat") {
      if (images?.length > 3) {
        setLoading(false);
        toast.error("Max 3 images");
        return;
      }
      const storeImage = async (image) => {
        return new Promise((resolve, reject) => {
          const storage = getStorage();
          const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

          const storageRef = ref(storage, "images/" + fileName);
          const uploadTask = uploadBytesResumable(storageRef, image);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
              }
            },
            (error) => {
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
              });
            }
          );
        });
      };

      const imgUrls = await Promise.all(
        [...images].map((image) => storeImage(image))
      ).catch(() => {
        setLoading(false);
        toast.error("Images not uploaded");
        return;
      });
      formDataCopy = {
        ...formData,
        imgUrls,

        timestamp: serverTimestamp(),
      };
    } else {
      delete formDataCopy.amenities;
    }

    delete formDataCopy.images;

    const docRef = await addDoc(collection(db, "listings"), formDataCopy);
    setFormData({});
    setLoading(false);
    toast.success("Listing saved");
    navigate("/", {
      state: { id: docRef.id },
    });
    // navigate(`/category/${formDataCopy.type}/${docRef.id}`)
  };

  const handleRemoveImage = (index) => {
    const imageArray = [...uploadedImages];
    imageArray.splice(index, 1);
    setUploadedImages([...imageArray]);
  };

  const onMutate = (e) => {
    let boolean = null;
    const files = e.target.files;
    const readerArray = [];
    const newUploadedImages = [...uploadedImages];

    // Create an array of FileReader objects

    for (let i = 0; i < files?.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        newUploadedImages.push(reader.result);
        setUploadedImages(newUploadedImages);
      };
      reader.readAsDataURL(files[i]);
      readerArray.push(reader);
    }

    if (e.target.value === "true") {
      boolean = true;
    }

    if (e.target.value === "false") {
      boolean = false;
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    //Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));

      const data = [];
      for (let i = 0; i < e.target.files.length; i++) {
        data.push(e.target.files[i].name);
      }
      setLessonImage((old) => [...old, data]);
    }

    //text/boolean/numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: boolean ?? e.target.value,
        name: auth?.currentUser?.displayName,
        userID: auth?.currentUser?.uid,
      }));
    }
  };
  const getSelectedValue = (selectedValue, type) => {
    setFormData({
      ...formData,
      [type]: selectedValue,
    });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flat-form">
      <div className="flat-type">
        <button
        
          onClick={() => navigate("/have-flat")}
          className={
            type === "have-flat" ? "have-flat-btn-active" : "have-flat-btn"
          }
        >
          Have Flat
        </button>
        <button
          onClick={() => navigate("/need-flat")}
          className={
            type === "need-flat" ? "need-flat-btn-active" : "need-flat-btn"
          }
        >
          Need Flat
        </button>
      </div>
      <div className="form-content">
        <h2 className="form-header">
          {type === "have-flat" ? "Have" : "Need"} Flat
        </h2>
        <h6 className="form-subheader">If you are looking for flatmate.</h6>
        <div className="form-partition"></div>

        <form className="form-main">
          <div className="form-row1">
            <div>
              {" "}
              <label htmlFor="">Add Your Location*</label>
              <TextInputField
                className="form-location"
                placeholder={"Add Location..."}
                icon={location_icon}
                name="loc"
                value={loc}
                type="icon"
                handleInputChange={onMutate}
              />
              <select
                className="addlistingDropdown"
                onClick={onMutate}
                name="city"
              >
                <option value="" disabled selected>
                  Select your city
                </option>
                {cityList.map((city) => {
                  return <option value={city.name}>{city.name}</option>;
                })}
              </select>
            </div>
            <SelectInputField
              selectList={genderList}
              value={genderPreference}
              tagline={"Looking For"}
              fieldType="genderPreference"
              getSelectedValue={getSelectedValue}
            />
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="">Approx Rent*</label>

              <TextInputField
                className="form-location"
                placeholder={"5000"}
                type="text"
                value={rent}
                icon="₹"
                name="rent"
                handleInputChange={onMutate}
              />
            </div>
            <SelectInputField
              selectList={occupancyList}
              tagline={"Occupancy"}
              value={occupancy}
              getSelectedValue={getSelectedValue}
              fieldType="occupancy"
            />
          </div>
          {type === "have-flat" && (
            <div>
              <label htmlFor="">Upload 3 Photos of your flat</label>
              <div className="upload-image">
                <input
                  type="file"
                  name="images"
                  id="file"
                  multiple
                  required
                  class="inputfile"
                  onChange={onMutate}
                />
                <label for="file" className="upload-btn">
                  <img src={upload} />
                  Click to upload Image
                  <input
                    type="file"
                    className="formInputFile"
                    name="images"
                    onChange={onMutate}
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
                {uploadedImages.length > 0 && (
                  <div className="uploadedImage">
                    <p>Uploaded Images:</p>
                    <hr></hr>
                    {uploadedImages.map((image, index) => (
                      <div>
                        <button onClick={() => handleRemoveImage(index)}>
                          X
                        </button>
                        <img
                          key={index}
                          src={image}
                          alt={`Uploaded ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
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
                value={contactNumber}
                name="contactNumber"
                handleInputChange={onMutate}
              />
            </div>

            <div className="form-date">
              <label for="start">
                {type === "have-flat" ? "Availaible from" : "Shift from"}
              </label>

              <input
                type="date"
                id="start"
                name="availableFrom"
                value={availableFrom}
                defaultValue={date}
                onChange={onMutate}
              />
            </div>
          </div>

          {type === "have-flat" && (
            <div className="amenities">
              <label htmlFor="">Amenities</label>
              <div className="amenities-list">
                {utilityList.map((utility, index) => {
                  return (
                    <MultipleSelectCard
                      project={utility}
                      value={amenities}
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
              name="desc"
              id=""
              placeholder="I am looking for a roommate for my flat."
              onChange={onMutate}
            ></textarea>
          </div>
          <div className="submit-btn">
            <button onClick={onSubmit}>Submit</button>
            <ToastContainer />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FlatForm;
