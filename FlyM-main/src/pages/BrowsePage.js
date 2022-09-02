import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import React from "react";
import FlightCard from "../components/FlightCard";
import Header from "../components/Header";
import FlightTable from "../components/FlightTable";
import Sidebar from "../Layout/Sidebar";

import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import "./BrowsePage.scss";
import {
  clearFlights,
  filterFlights,
} from "../store/actions/searchFlightActions";
import NotFound from "../Layout/NotFound";

const BrowsePage = () => {
  const dispatch = useDispatch();

  const [isStopsChecked, setIsStopsChecked] = useState([false, false]);
  const [isAirlineChecked, setIsAirlineChecked] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  /**
   * Theme for the grid
   * @params theme
   * @returns void
   */
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const sendStopsSelectionData = ([index1, index2]) => {
    setIsStopsChecked([index1, index2]);
  };

  const sendAirlineSelectionData = ([
    index1,
    index2,
    index3,
    index4,
    index5,
  ]) => {
    setIsAirlineChecked([index1, index2, index3, index4, index5]);
  };

  const flightData = useSelector((state) => state.flights.flights);
  const filteredFlightData = useSelector(
    (state) => state.flights.filteredFlights
  );
  const lastAction = useSelector((state) => state.flights.lastAction);
  const isFlightDataLoading = useSelector(
    (state) => state.flights.isFlightDataLoading
  );

  useEffect(() => {
    if (isStopsChecked[0]) {
      dispatch(filterFlights({ filterParams: "Non Stop", flightData }));
    } else if (isStopsChecked[1]) {
      dispatch(filterFlights({ filterParams: "1 Stop", flightData }));
    } else {
      dispatch(clearFlights(flightData));
    }
  }, [isStopsChecked[0], isStopsChecked[1]]);

  useEffect(() => {
    let modifiedFlightData = filteredFlightData
      ? filteredFlightData
      : flightData;
    if (isAirlineChecked[0]) {
      dispatch(
        filterFlights({
          filterParams: "Air Asia",
          flightData: modifiedFlightData,
        })
      );
    } else if (isAirlineChecked[1]) {
      dispatch(
        filterFlights({
          filterParams: "Go First",
          flightData: modifiedFlightData,
        })
      );
    } else if (isAirlineChecked[2]) {
      dispatch(
        filterFlights({
          filterParams: "Indigo",
          flightData: modifiedFlightData,
        })
      );
    } else if (isAirlineChecked[3]) {
      dispatch(
        filterFlights({
          filterParams: "Spicejet",
          flightData: modifiedFlightData,
        })
      );
    } else if (isAirlineChecked[4]) {
      dispatch(
        filterFlights({
          filterParams: "Vistara",
          flightData: modifiedFlightData,
        })
      );
    } else {
      dispatch(clearFlights(flightData));
    }
  }, [
    isAirlineChecked[0],
    isAirlineChecked[1],
    isAirlineChecked[2],
    isAirlineChecked[3],
    isAirlineChecked[4],
  ]);

  return (
    <React.Fragment>
      <Header />
      <Box sx={{ flexGrow: 1 }} style={{ padding: "5px" }}>
        <Grid container spacing={2}>
          <Grid item xs={4} md={3} sm={4} className="filters">
            <Sidebar
              sendStopsSelectionData={sendStopsSelectionData}
              sendAirlineSelectionData={sendAirlineSelectionData}
            />
          </Grid>
          <Grid item xs={8} md={9} sm={8} className="table-grid">
            <Item>
              {isFlightDataLoading && <p>Loading</p>}
              {flightData.length > 0 && (
                <React.Fragment>
                  {! (!filteredFlightData?.length > 0 &&
                  lastAction !== "Filter Flights") &&  filteredFlightData.length !== 0 &&
                  <FlightTable />}
                  {!filteredFlightData?.length > 0 &&
                  lastAction !== "Filter Flights"
                    ? flightData.map((flight) => {
                        return (
                          <FlightCard
                            key={flight._id}
                            id={flight._id}
                            flightConfiguration={flight}
                          />
                        );
                      })
                    :( filteredFlightData.length === 0)? 
                     <NotFound message="Sorry for the inconvenience. We could not find any flights!"/>
                    : filteredFlightData.map((flight) => {
                        return (
                          <FlightCard
                            key={flight._id}
                            id={flight._id}
                            flightConfiguration={flight}
                          />
                        );
                      })}
                </React.Fragment>
              )}
            </Item>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};
export default BrowsePage;
