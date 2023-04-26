import React, { useState } from "react";
import { useEffect } from "react";

const SelectInputField = ({
  tagline,
  selectList,
  getSelectedValue,
  fieldType,
  value = "",
}) => {
  const [selectValue, setSelectValue] = useState();
  useEffect(() => {
    setSelectValue(value);
  });
  const onMutate = (e) => {
    console.log(e.target.name);
    selectList.forEach((element) => {
      if (e.target.name === element) {
        setSelectValue(element);
      }
    });
    console.log(selectValue);
    getSelectedValue(e.target.name, fieldType);

    // if (e.target.name === "Male") {
    //   setSelectValue("Male");
    // }
    // if (e.target.value === "Female") {
    //   setSelectValue("Female");
    // }
  };
  return (
    <div className="multiple-select">
      <p className="select-tag">{tagline}</p>
      <div className="select-options">
        {selectList.map((value) => {
          return (
            <button
              className={selectValue === value ? "btnactive" : "btn"}
              type="button"
              name={value}
              value={1}
              onClick={onMutate}
            >
              {value}
            </button>
          );
        })}

        {/* <button
          className={!gender ? "btnactive" : "btn"}
          type="button"
          value={2}
          onClick={onMutate}
          style={{ marginRight: "50px" }}
        >
          Female
        </button> */}
      </div>
    </div>
  );
};

export default SelectInputField;
