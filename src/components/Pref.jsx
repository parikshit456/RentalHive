import React from "react";

import { useState, useEffect } from "react";
import MultipleSelectCard from "./MultipleSelectCard";
import { preferenceList } from "../assets/prefs";
import { getAuth } from "firebase/auth";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "./Spinner";

const Pref = ({ data }) => {
  const navigate = useNavigate();

  const [selectedPrefList, setSelectedPrefList] = useState([]);
  const [prefList, setPrefList] = useState(preferenceList);
  const [loading, setLoading] = useState(false);

  const onClick = (index) => {
    let prefs = [...prefList];
    let selectedPref = { ...prefs[index], selected: !prefs[index].selected };
    prefs[index] = selectedPref;
    setPrefList(prefs);
    let prefsTempList = prefs.filter((pref) => pref.selected === true);

    prefsTempList = prefsTempList.map((element) => {
      return element.title;
    });

    setSelectedPrefList([...prefsTempList]);
  };
  const auth = getAuth();

  console.log(auth);
  const user = auth?.currentUser;

  const onSubmit = async () => {
    console.log(user);
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        ...data,
        prefList: selectedPrefList,
        timeStamp: serverTimestamp(),
      });
      navigate("/");

      toast.success("You are succesfully registered", {
        position: "top-right", // Set the position of the toast
        autoClose: 3000, // Close the toast after 3 seconds
        hideProgressBar: false, // Show progress bar while the toast is open
        closeOnClick: true, // Close the toast when clicked
        pauseOnHover: true, // Pause autoClose when hovered
        draggable: true, // Make the toast draggable
        progress: undefined, // Use the default progress bar
      });
    }
  };

  useEffect(() => {
    console.log(user?.uid);

    const fetchListing = async () => {
      const docRef = doc(db, "users", user?.uid);
      const docSnap = await getDoc(docRef);

      console.log(docSnap.data());
      if (docSnap.exists()) {
        setLoading(true);

        console.log(docSnap.data());
        let tempList = docSnap.data().prefList;
        const updatedListWithSelected = prefList.map((item) => {
          if (tempList.includes(item.title)) {
            return { ...item, selected: true };
          } else {
            return item;
          }
        });
        setPrefList(updatedListWithSelected);
        console.log(prefList);
        // prefList = prefList.map((pref) => {});
        // setUserList(docSnap.data().prefList);
        console.log(docSnap.data().prefList);

        setLoading(false);
      }
    };
    fetchListing();
  }, [auth?.currentUser?.uid]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="prefDiv">
      <div className="prefCard">
        <p style={{ textAlign: "center", fontSize: "23px" }}>
          What type of flatmate you like?
        </p>
        <p style={{ textAlign: "center", fontSize: "13px", padding: "15px" }}>
          {" "}
          select at least 5 categories{" "}
        </p>
        <div className="prefCardInside">
          {prefList.map((project, index) => {
            return (
              <MultipleSelectCard
                project={project}
                index={index}
                onClick={onClick}
              />
            );
          })}
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="prefBtn" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pref;
