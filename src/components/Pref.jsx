import React from "react";

import { useState } from "react";
import MultipleSelectCard from "./MultipleSelectCard";
import { preferenceList } from "../assets/prefs";

const Pref = () => {
  const [prefList, setPrefList] = useState(preferenceList);
  const onClick = (index) => {
    let prefs = [...prefList];
    let selectedPref = { ...prefs[index], selected: !prefs[index].selected };
    prefs[index] = selectedPref;
    setPrefList(prefs);
  };

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
          <button className="prefBtn">Continue</button>
        </div>
      </div>
    </div>
  );
};

export default Pref;
