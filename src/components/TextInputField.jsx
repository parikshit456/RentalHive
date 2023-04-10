import React from "react";

const TextInputField = ({
  handleInputChange,
  placeholder,
  icon,
  type = "icon",
  name
}) => {
  return (
    <div className="text-box">
      {type === "icon" ? (
        <img className="input-icon" src={icon} alt="" />
      ) : (
        <div className="input-text">{icon}</div>
      )}

      <div className="input-bar">
        <input
        name={name}
          onChange={handleInputChange}
          type="text"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default TextInputField;
