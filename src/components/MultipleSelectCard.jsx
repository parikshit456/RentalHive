import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const MultipleSelectCard = ({
  project,
  index,
  onClick,
  isDetailedView = false,
  value =[]
}) => {
  const [selected,setSelected] = useState(project.selected)
 console.log(value)
  useEffect(()=>{
    if(value && value.includes(project.title)){
      console.log(project.title)
      setSelected(true)

    }else{
      setSelected(project.selected)

    }
  },[value])
  return (
    <button
      onClick={() => onClick(index)}
      key={index}
      className={
        selected
          ? "multiple-select-card-active"
          : isDetailedView
          ? "multiple-selected"
          : "multiple-select-card"
      }
    >
      <img
        src={project.src}
        style={{ width: "50%", height: "25px" }}
        className="selectCardImg"
      ></img>
      <p style={{fontWeight: "600" , fontSize:"11px"}}>{project.title}</p>
    </button>
  );
};

export default MultipleSelectCard;
