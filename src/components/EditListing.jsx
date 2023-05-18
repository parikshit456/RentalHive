import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextInputField from "./TextInputField";
import location_icon from "../assets/svg/location_icon.svg";
import SelectInputField from "./SelectInputField";
import upload from "../assets/svg/upload.svg";
import { amenitiesList } from "../assets/amenities";
import MultipleSelectCard from "./MultipleSelectCard";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";
import { AiFillDelete, FaTrash } from "react-icons/fa";

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
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { async } from "@firebase/util";
import { useEffect } from "react";
import { cityList } from "../assets/cityList";
import Footer from "./Footer";

const EditListing = () => {
  const location = useLocation();
  let type = location.pathname;
  type = type.substring(1);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  var curr = new Date();
  const auth = getAuth();
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substring(0, 10);
  const genderList = ["Male", "Female", "Any"];
  const occupancyList = ["Single", "Shared", "Any"];
  const [listingId, setListingId] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [inputError, setInputError] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    clientType: "",
    loc: "",
    genderPreference: "",
    rent: 0,
    occupancy: "",
    images: {},
    amenities: [],
    imgUrls: [],
    desc: "",
    contactNumber: "",
    city: "",
    college:"",
    userID: "",
    availableFrom: date,
  });

  const {
    name,
    clientType,
    loc,
    imgUrls,
    genderPreference,
    rent,
    occupancy,
    images,
    amenities,
    desc,
    userID,
    city,
    college,
    contactNumber,
    availableFrom,
  } = formData;
  const [utilityList, setUtilityList] = useState(amenitiesList);

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
        });

        setFormData(listings[0]?.data);
        setListingId(listings[0]?.id);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listings");
      }
    };
    fetchListing();
  }, [auth?.currentUser?.uid]);

  const onClick = async (index) => {
    let tempUtilityList = amenitiesList.forEach((value) => {
      if (amenities.includes(value.title)) {
        value.selected = true;
      }
    });

    setUtilityList(tempUtilityList);
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
      amenities: [...amenitiesTempList],
    });
  };

  function validateForm(formData) {
    const errors = {};

    if (!loc.match(/^[a-zA-Z\s]{3,}$/)) {
      errors.loc = "Please add location";
    }

    if (!rent.match(/^\d+(?:\.\d{1,2})?$/)) {
      errors.rent = "Rent must be a number with up to two decimal places.";
    }

    if (!contactNumber.match(/^\+?\d{1,3}[-\.\s]?\d{3}[-\.\s]?\d{4}$/)) {
      errors.contactNumber = "Contact number must be a valid phone number.";
    }

    if (!desc.match(/^.{10,}$/)) {
      errors.desc = "Description must have a minimum length of 10 characters.";
    }
    if (!images || images.length < 1) {
      errors.images = "Please select at least one image.";
    }

    // console.log(images.length);

    if (!city) {
      errors.city = "Please select a city.";
    }
    return errors;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(errors);
    const errorList = validateForm();
    if (Object.keys(errorList).length === 0) {
      setLoading(true);
      let formDataCopy = {
        ...formData,
        name: auth.currentUser.displayName,
      };
      if (clientType === "have-flat") {
        if (images?.length > 3) {
          setLoading(false);
          toast.error("Max 3 images");
          return;
        }
        const storeImage = async (image) => {
          return new Promise((resolve, reject) => {
            const storage = getStorage();
            const fileName = `${auth.currentUser.uid}-${
              image.name
            }-${uuidv4()}`;

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

        const imageUrls = await Promise.all(
          [...images].map((image) => storeImage(image))
        ).catch(() => {
          setLoading(false);
          toast.error("Images not uploaded");
          return;
        });

        formDataCopy = {
          ...formData,
          imgUrls: imageUrls,
          timestamp: "",
        };
        console.log(formDataCopy);
      } else {
        delete formDataCopy.amenities;
      }

      delete formDataCopy.images;
      try {
        const docRef = doc(db, "listings", listingId);
        await updateDoc(docRef, formDataCopy);
        setLoading(false);
        toast.success("Listing saved");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      const keys = Object.keys(errorList);
      setErrors(errorList);
      console.log(keys[0]);
      const firstErrorKey = keys[0];
      const firstErrorElement = document.getElementsByName(firstErrorKey)[0];
      firstErrorElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRemoveImage = (index, image) => {
    const imageArray = [...uploadedImages];
    imageArray.splice(index, 1);
    setUploadedImages([...imageArray]);
  };

  const onMutate = (e) => {
    let boolean = null;
    const files = e.target.files;
    const readerArray = [];
    const newUploadedImages = [...uploadedImages];

    const value = e.target.value;
    const regex = /^[a-zA-Z\s]*$/; // Example: only allows alphabetic characters and spaces

    if (!regex.test(value)) {
      setInputError(
        "Invalid input. Please use only alphabetic characters and spaces."
      );
    } else {
      setInputError("");
    }
    // console.log(uploadedImages)

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
    }

    //text/boolean/numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: boolean ?? e.target.value,
      }));
    }
  };
  const getSelectedValue = (selectedValue, type) => {
    setFormData({
      ...formData,
      [type]: selectedValue,
    });
  };
  const onDelete = async () => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await deleteDoc(doc(db, "listings", listingId));
        toast.success("Successfully deleted listing");
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="flat-form">
      <div className="edit-flat-type">
        <div className="sub-flat">
          <button
            onClick={() => navigate("/EditListing")}
            className={
              clientType === "have-flat"
                ? "have-flat-btn-active"
                : "have-flat-btn"
            }
          >
            {clientType === "have-flat" ? "Have" : "Need"} Flat
          </button>
        </div>
        <button onClick={onDelete} style={{ cursor: "pointer" }}>
          <FaTrash />
        </button>
      </div>
      <div className="form-content">
        <h2 className="form-header">
          {clientType === "have-flat" ? "Have" : "Need"} Flat
        </h2>
        <h6 className="form-subheader">If you are looking for flatmate.</h6>
        <div className="form-partition"></div>

        <form className="form-main">
          <div className="form-row1">
            <div>
              {" "}
              <label htmlFor="">Add Your Location*</label>
              {inputError && <div style={{ color: "red" }}>{inputError}</div>}
              <TextInputField
                className="form-location"
                placeholder={"Add Location..."}
                icon={location_icon}
                value={loc}
                name="loc"
                type="icon"
                error={errors.loc}
                handleInputChange={onMutate}
              />
              <select
                className="addlistingDropdown"
                onClick={onMutate}
                name="city"
                title="Please select a city"
              >
                <option value={city} disabled selected>
                  {city}
                </option>
                {cityList.map((city) => {
                  return <option value={city.name}>{city.name}</option>;
                })}
              </select>

              {city === "Mumbai" ? <select
                className="addlistingDropdown"
                onClick={onMutate}
                name="college"
              >
                <option disabled selected>
                  {college}
                </option>
                {cityList[0].college.map((college) => {
                  return <option value={college}>{college}</option>;
                })}
              </select> : <></>
              }

              {errors && <div className="error-msg">{errors.city}</div>}
            </div>
            <SelectInputField
              selectList={genderList}
              tagline={"Looking For"}
              value={genderPreference}
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
                icon="₹"
                name="rent"
                value={rent}
                error={errors.rent}
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
          {clientType === "have-flat" && (
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
                        <button onClick={() => handleRemoveImage(index, image)}>
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
          {errors && <div className="error-msg">{errors.images}</div>}

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
                error={errors.contactNumber}
                handleInputChange={onMutate}
              />
            </div>

            <div className="form-date">
              <label for="start">
                {clientType === "have-flat" ? "Availaible from" : "Shift from"}
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

          {clientType === "have-flat" && (
            <div className="amenities">
              <label htmlFor="">Amenities</label>
              <div className="amenities-list">
                {utilityList.map((utility, index) => {
                  return (
                    <MultipleSelectCard
                      project={utility}
                      index={index}
                      onClick={onClick}
                      value={amenities}
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
              value={desc}
              placeholder="I am looking for a roommate for my flat."
              onChange={onMutate}
            ></textarea>
            {errors && <div className="error-msg">{errors.desc}</div>}
          </div>
          <div className="submit-btn">
            <button onClick={onSubmit}>Update</button>
            <ToastContainer />
          </div>
        </form>
      </div>
      <Footer/>
    </div>
  );
};

export default EditListing;
