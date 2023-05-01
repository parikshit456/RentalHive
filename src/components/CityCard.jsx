import React from "react";
import { useNavigate } from "react-router-dom";

const CityCard = ({ city }) => {
  const navigate = useNavigate();
  const onCardClick = () => {
    if (city) {
      navigate("/listings", {
        state: {
          value: city,
        },
      });
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url(${city.image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="city-card"
      onClick={onCardClick}
    >
      <h2>{city.name}</h2>
      {/* <img src={city.image} width="50px" alt="" /> */}
    </div>
  );
};

export default CityCard;
