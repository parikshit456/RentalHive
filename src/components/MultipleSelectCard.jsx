import React from "react";

const MultipleSelectCard = ({
  project,
  index,
  onClick,
  isDetailedView = false,
}) => {
  return (
    <button
      onClick={() => onClick(index)}
      key={index}
      className={
        project.selected
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
