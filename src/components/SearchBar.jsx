import React, { useState } from "react";
import { cityList } from "../assets/cityList";
import { Autocomplete } from "@mui/material";
import { useNavigate } from "react-router";

const SearchBar = ({
  handleInputChange,
  placeholder,
  icon,
  type = "icon",
  name = "",
  style = {},
}) => {
  const [value, setValue] = useState({ name: name, state: "" });
  const navigate = useNavigate();
  const onChangeHandler = (e, v) => {
    if (v) {
      setValue(v);
      navigate("/listings", {
        state: {
          value: v,
        },
      });
    }
  };
  return (
    <div className="search-input">
      <img
        className="search-input-icon"
        style={{ fill: "black" }}
        src={icon}
        alt=""
      />

      <div className="search-input-bar">
        <Autocomplete
          freeSolo
          id="custom-input-demo"
          openOnFocus={false}
          value={value}
          onChange={onChangeHandler}
          options={cityList}
          getOptionLabel={(opt) => opt.name}
          renderInput={(params) => (
            <div ref={params.InputProps.ref}>
              <input style={style} type="text" {...params.inputProps} />
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default SearchBar;
