import React from "react";

const TextInputField = ({
  handleInputChange,
  placeholder,
  icon,
  value,
  type = "icon",
  name,
  error
}) => {
  return (
    <div>
    <div className="text-box">
      {type === "icon" ? (
        <img className="input-icon" src={icon} alt="" />
      ) : (
        <div className="input-text">{icon}</div>
      )}

      <div className="input-bar">
        <input
        name={name}
        value={value}
          onChange={handleInputChange}
          type="text"
          placeholder={placeholder}
        />
      </div>
    </div>
    {error && <div className="error-msg">{error}</div>
}
    </div>
  );
};

export default TextInputField;
