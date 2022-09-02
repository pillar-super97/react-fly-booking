import React from "react";
import "./FlightCard.scss";
import airindia from "./../assets/images/airindia.png";
import gofirst from "./../assets/images/gofirst.png";
import indigo from "./../assets/images/indigo.png";
import spicejet from "./../assets/images/spicejet.png";
import vistara from "./../assets/images/vistara.png";
const FlightCard = ({ flightConfiguration, id }) => {
  const { airline, arrival, duration, price, type } = flightConfiguration;

  const getAirlineImage = (airline) => {
    switch (airline) {
      case "Spicejet":
        return spicejet;
      case "Go First":
        return gofirst;
      case "Indigo":
        return indigo;
      case "Air Asia":
        return airindia;
      case "Vistara":
        return vistara;
      default:
        return "";
    }
  };

  return (
    <React.Fragment>
      <div className="flight-card">
        <span className="airline">
          <img
            src={getAirlineImage(airline)}
            className="airline-image"
            alt="airline-images"
          ></img>
        </span>
        <span className="arrival">{arrival}</span>
        <span className="duration-type">
          <span className="duration">{duration}</span>
          <span className="type">{type}</span>
        </span>

        <span className="price">{`₹ ${price}`}</span>
      </div>
    </React.Fragment>
  );
};

export default FlightCard;
