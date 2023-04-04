import React from "react";

const MultipleSelectCard = ({ project, index, onClick }) => {
  return (
    <button
      onClick={() => onClick(index)}
      key={index}
      className={
        project.selected
          ? "multiple-select-card-active"
          : "multiple-select-card"
      }
    >
      <img
        src={project.src}
        style={{ width: "90%", height: "50px" }}
        className="selectCardImg"
      ></img>
      <p>{project.title}</p>
    </button>
  );
};

export default MultipleSelectCard;
