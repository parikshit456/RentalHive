import React from "react";

const CityCard = ({ city }) => {
  console.log(city);
  return (
    <div
      style={{
        backgroundImage: `url(${city.image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="city-card"
    >
      <h2>{city.name}</h2>
      {/* <img src={city.image} width="50px" alt="" /> */}
    </div>
  );
};

export default CityCard;
