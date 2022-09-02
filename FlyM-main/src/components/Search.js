import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { searchFlights } from "../store/actions/searchFlightActions";
import { useDispatch } from "react-redux";
import { dateFormatter } from "../utility/dateFormatter";
import { useNavigate } from "react-router-dom";
import "./Search.scss";
import axios from "axios";
import flying from "./../assets/images/flying.png";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const Search = () => {
  const [fromLandmark, setFromLandmark] = useState("");
  const [toDestination, setToDestination] = useState("");
  const [date, setDate] = useState("");

  const [suggestions, setSuggestions] = useState("");
  const [sourceSuggestion, setSourceSuggestion] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    centralised: {
      justifyContent: "center",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    formfield: {
      padding: "10px 0px",
    },
  }));
  const classes = useStyles();
  const submitHandler = (event) => {
    event.preventDefault();
    let formattedDate = dateFormatter(date);
    dispatch(
      searchFlights({
        to: toDestination,
        from: fromLandmark,
        date: formattedDate,
      })
    );
    navigate("/FlyM/browse-page");
  };

  /**
   * Destination change handler
   * @param {*} e
   * @returns {void}
   */
  const destinationChangeHandler = async (e) => {
    setToDestination(e.target.value);
    let value = e.target.value;
    const list = await axios.get(
      "https://backendflym.herokuapp.com/api/getAll"
    );
    let items = [];
    list.data.forEach((listItem) => {
      items.push(listItem.name);
    });

    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, `i`);
      setSuggestions(items.sort().filter((v) => regex.test(v)));
    }
    if (value.length === 0) {
      setSuggestions("");
    }
  };

  /**
   * Renders the suggestion for destination
   * @returns
   */
  const renderDestinationSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map((city) => (
          <li key={city} onClick={(e) => destinationSuggestionSelected(city)}>
            {city}
          </li>
        ))}
      </ul>
    );
  };

  /**
   * On Selection of destination suggestion.
   * @param {*} value
   */
  const destinationSuggestionSelected = (value) => {
    setToDestination(value);
    setSuggestions("");
  };

  /**
   * Chnage handler for landmark.
   * @param {*} e
   */
  const sourceChangeHandler = async (e) => {
    setFromLandmark(e.target.value);
    let value = e.target.value;
    const list = await axios.get(
      "https://backendflym.herokuapp.com/api/getAll"
    );
    let items = [];
    list.data.forEach((listItem) => {
      items.push(listItem.name);
    });

    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, `i`);
      setSourceSuggestion(items.sort().filter((v) => regex.test(v)));
    }
    if (value.length === 0) {
      setSourceSuggestion("");
    }
  };

  /**
   * Renders the suggestion for source
   * @returns
   */
  const renderSourceSuggestions = () => {
    if (sourceSuggestion.length === 0) {
      return null;
    }
    return (
      <ul>
        {sourceSuggestion.map((city) => (
          <li key={city} onClick={(e) => sourceSuggestionSelected(city)}>
            {city}
          </li>
        ))}
      </ul>
    );
  };

  /**
   * On Selection of source suggestion.
   * @param {*} value
   */
  const sourceSuggestionSelected = (value) => {
    setFromLandmark(value);
    setSourceSuggestion("");
  };

  /**
   * Date change handler.
   * @param {*} e
   */
  const dateChangeHandler = (e) => {
    setDate(e.target.value);
  };

  return (
    <div className="search">
      <div className={`grid ${classes.root}`}>
        <Grid container className={classes.centralised}>
          <Grid item xs={6} md={6} xl={6} className="left">
            <img src={flying} className="home-image"></img>
          </Grid>
          <Grid item xs={6} md={6} xl={6} className="form-container">
            <Paper className={classes.paper}>
              <p className="marquee">Welcome to the FlyM</p>
              <p className="marquee-description">Flight booking made easy with just one click!</p>
              <form className={classes["form"]} onSubmit={submitHandler}>
                <div className={classes["formfield"]}>
                  <label className="labels">Select your destination</label>
                  <div className="TypeAheadDropDown">
                    <input
                      type="text"
                      aria-label="ToDestination"
                      aria-required="true"
                      value={toDestination}
                      onChange={destinationChangeHandler}
                      required
                    ></input>
                    {renderDestinationSuggestions()}
                  </div>
                </div>
                <div className={classes["formfield"]}>
                  <label className="labels">Select your location</label>
                  <div className="TypeAheadDropDown">
                    <input
                      type="text"
                      aria-label="FromLandmark"
                      value={fromLandmark}
                      onChange={sourceChangeHandler}
                      aria-required="true"
                      required
                    ></input>
                    {renderSourceSuggestions()}
                  </div>
                </div>
                <div className={classes["formfield"]}>
                  <label className="labels">Date</label>
                  <div className="calender">
                  <DatePicker selected={date} onChange={(date) => setDate(date)} />
                  {/* <input
                    type="date"
                    aria-label="DateOfTravelling"
                    value={date}
                    onChange={dateChangeHandler}
                    aria-required="true"
                    className="datepicker-input"
                    required
                  ></input> */}
                  </div>
                </div>
                <Button color="primary" type="submit" className="search-flights-button">
                  Search Flights
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Search;
