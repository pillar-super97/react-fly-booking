// airline(pin):"Indigo"
// from(pin):"Kolkata"
// to(pin):"Bangalore"
// date(pin):"01/04/2022"
// departure(pin):"04:30"
// arrival(pin):"06:55"
// price(pin):"5754"
// duration(pin):"2h 30m"
// type(pin):"Nonstop"
// totalSeats(pin):"300"
// availableSeats(pin):"300"

import React from "react";
import  './FlightTable.scss';
const FlightTable = () => {
    return <React.Fragment>
        <div className="table-header">
            <span className="airline">Airline</span>
            <span className="arrival">Arrival</span>
            <span className="duration">Duration</span>
            <span className="price">Price</span>
        </div>
    </React.Fragment>
}

export default FlightTable;