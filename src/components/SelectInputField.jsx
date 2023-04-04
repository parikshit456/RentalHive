import React, { useState } from "react";

const SelectInputField = ({ tagline, selectList }) => {
  const [selectValue, setSelectValue] = useState("");

  const onMutate = (e) => {
    selectList.forEach((element) => {
      if (e.target.name === element) {
        setSelectValue(element);
      }
    });
    console.log(selectValue);

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
          console.log(value);
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
