import React, { useState, useEffect, useContext } from 'react';
import './Navigation.css'
import { Link } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
// import bookMyShowLogo from '../Navigation/bookMyShowLogo.png'
import bookMyShowLogo from "../Navigation/logo.png";

//mantine library
import { Input } from "@mantine/core";
import { Button } from "@mantine/core";
import { Avatar } from "@mantine/core";

//wishlist hert icon
import { AiFillHeart } from "react-icons/ai";
import { loggedInUserNameContext, searchMoviesContext } from "../../App";

//my API details
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjEwMzkxN2YzOWZlMmZkOWMzNThlYTk2ZGY3MTk5NiIsInN1YiI6IjY0OGM0YTMxMDc2Y2U4MDEyNThjZTQ5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Sijg5H7ZHEY_y-LiBY2oBp7t3Icso0uY9cfKoIkcMUY",
  },
};

let url = "";

const Navigation = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { loggedInUserName } = useContext(loggedInUserNameContext);
  const { movieSearch, setMovieSearch } = useContext(searchMoviesContext);

  //useEffect handling search term movie searching
  useEffect(() => {
    const timer = setTimeout(() => {
      // Perform your action here, such as an API call
      console.log("Search term:", searchTerm);
      url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`;
      fetch(url, options)
        .then((response) => response.json())
        .then((response) => {
          //console.log(response.results)
          setMovieSearch([...response.results]);
        })
        .catch((err) => console.error(err));

      //console.log(movieSearch, "movie search")
    }, 1000); // Delay in milliseconds

    // Cleanup function to cancel the timer on component unmount or when the search term changes
    return () => clearTimeout(timer);
  }, [searchTerm, url]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <nav className="navBar">
        <a href="/">
          <img
            src={bookMyShowLogo}
            alt="bookMyShowLogo"
            width="80px"
            height="130px"
          />
        </a>

        <div className="searchBarContainer">
          <Input
            className="navSearchBar"
            value={searchTerm}
            placeholder="Search Movie"
            radius="md"
            size="md"
            onChange={handleChange}
          />
        </div>

        <div>
          {/* react-icons added for wishlist */}
          <Link to="wishlist">
            <AiFillHeart color="#B70404" size="40px" />
          </Link>
        </div>

        <div className="userContainer">
          {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVduyB0yyafxLCNG4DVmM1Z5FTXcI6uT7JsA&usqp=CAU" width="50px" height="50px"></img> */}
          <Link to="login-signup">
            <Avatar src={null} alt="no image here" />
          </Link>
          <h5>
            {loggedInUserName === ""
              ? "SignUp"
              : loggedInUserName.toUpperCase()}
          </h5>
        </div>
      </nav>
    </>
  );
};

export default Navigation