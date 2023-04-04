import React from "react";

const TextInputField = ({ placeholder, icon, type = "icon" }) => {
  return (
    <div className="text-box">
      {type === "icon" ? (
        <img className="input-icon" src={icon} alt="" />
      ) : (
        <div className="input-text">{icon}</div>
      )}

      <div className="input-bar">
        <input type="text" placeholder={placeholder} />
      </div>
    </div>
  );
};

export default TextInputField;
