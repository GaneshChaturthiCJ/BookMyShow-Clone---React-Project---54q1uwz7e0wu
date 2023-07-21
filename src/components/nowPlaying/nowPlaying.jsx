import * as React from "react";
import "./nowPlaying.css";
import "./movieModal.css";

import { Pagination } from "@mantine/core";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import Genre from "../genre/genre";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

//modal imports
import Modal from "@mui/material/Modal";
import {
  MyModalContext,
  searchMoviesContext,
  wishListContext,
} from "../../App";

//API_KEY details
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjEwMzkxN2YzOWZlMmZkOWMzNThlYTk2ZGY3MTk5NiIsInN1YiI6IjY0OGM0YTMxMDc2Y2U4MDEyNThjZTQ5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Sijg5H7ZHEY_y-LiBY2oBp7t3Icso0uY9cfKoIkcMUY",
  },
};

//modal styles
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  minHeight: 550,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1,
  color: "white",
};

const NowPlaying = ({
  movieList,
  setMovieList,
  movieListBackup,
  setMovieListBackup,
  selectedGenreItem,
  setSelectedGenreItem,
}) => {
  const [activePage, setPage] = useState(1);

  const { modalData, setModalData } = useContext(MyModalContext);
  const { movieSearch, setMovieSearch } = useContext(searchMoviesContext); // search term

  // using hook to navigate to booking-page onClick of book tickets button
  const navigate = useNavigate();

  //functions to open and close modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //getting the data of the movie card clicked
  const handleMovieCardClick = (event) => {
    console.log(event.currentTarget);

    const divData = {
      heading: event.currentTarget.querySelector("h5").innerText,
      imageUrl: event.currentTarget.querySelector("img").getAttribute("src"),
      movieDescription:
        event.currentTarget.querySelector(".movieDescription").textContent,
      language: event.currentTarget.querySelectorAll("p")[0].textContent,
      rating: event.currentTarget.querySelectorAll("p")[1].textContent,
      movieId: event.currentTarget.querySelectorAll("span")[0].textContent,
      releaseDate: event.currentTarget.querySelectorAll("span")[1].textContent,
    };

    setModalData({ ...divData });
    //console.log(modalData);
  };

  useEffect(() => {
    let pageNum = parseInt(event.target.innerHTML);

    if (isNaN(pageNum)) {
      pageNum = 1;
    }

    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNum}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setMovieList([...response.results]);
        //setMovieListBackup([...response.results]);
      })
      .catch((err) => console.error(err));
  }, [activePage]);

  const { wishList, setWishList } = useContext(wishListContext);
  const handleAddWishList = (event) => {
    const parentElement = event.target.parentElement;
    console.log(event.target.parentElement);

    const divDataForWishlist = {
      heading: event.target.parentElement.querySelector("h1").innerText,
      imageUrl: event.target.parentElement
        .querySelector("img")
        .getAttribute("src"),
      movieDescription:
        event.target.parentElement.querySelectorAll("div")[1].textContent,
      language: event.target.parentElement.querySelectorAll("p")[0].textContent,
      rating: event.target.parentElement.querySelectorAll("p")[1].textContent,
      movieId:
        event.target.parentElement.querySelectorAll("span")[0].textContent,
      releaseDate:
        event.target.parentElement.querySelectorAll("span")[1].textContent,
    };

    //console.log(divDataForWishlist);

    setWishList([...wishList, divDataForWishlist]); // added item to wishlist state variable
  };

  return (
    <>
      <Navigation />
      <Genre
        movieList={movieList}
        selectedGenreItem={selectedGenreItem}
        setSelectedGenreItem={setSelectedGenreItem}
      />
      {/* conditionally render movies list based on search term */}
      {movieSearch.length === 0 ? (
        ""
      ) : (
        <>
          <div className="nowPlaying" style={{ color: "white" }}>
            <h1>Search Results</h1>
            <div className="nowPlayingMovieCard" onClick={handleOpen}>
              {movieSearch.map((movie) => {
                return (
                  <div className="movie" onClick={handleMovieCardClick}>
                    <h5>{movie.original_title}</h5>
                    <img
                      src={
                        "https://image.tmdb.org/t/p/original/" +
                        movie.poster_path
                      }
                      width="250px"
                      height="150px"
                      alt="ImgFailed"
                    />
                    <div className="movieDescription">{movie.overview}</div>
                    <p>Language: {movie.original_language.toUpperCase()}</p>
                    <p>⭐ {movie.vote_average}/10</p>
                    <span>Movie Id: {movie.id}</span>
                    <span>Release Date: {movie.release_date}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
      {/* now_playing js code */}
      <div className="nowPlaying">
        <h1
          style={{
            color: "white",
            marginBottom: "10px",
            marginLeft: "10px",
            justifyContent: "center",
          }}
        >
          Now Playing
        </h1>
        <div className="nowPlayingMovieCard" onClick={handleOpen}>
          {movieList.map((movie) => {
            return (
              <div className="movie" onClick={handleMovieCardClick}>
                <h5>{movie.original_title}</h5>
                <img
                  src={
                    "https://image.tmdb.org/t/p/original/" + movie.poster_path
                  }
                  width="250px"
                  height="150px"
                  alt="ImgFailed"
                />
                <div className="movieDescription">{movie.overview}</div>
                <p>Language: {movie.original_language.toUpperCase()}</p>
                <p>⭐ {movie.vote_average}/10</p>
                <span>Movie Id: {movie.id}</span>
                <span>Release Date: {movie.release_date}</span>
              </div>
            );
          })}
        </div>
        <div className="nowPlayingPagination">
          <Pagination value={activePage} onChange={setPage} total={10} />
        </div>
      </div>
      ;
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="movieModal">
            <h1>{modalData.heading}</h1>
            <div className="modalImage">
              <img
                src={modalData.imageUrl}
                width="250px"
                height="190px"
                alt="ImgFailed"
              />
            </div>
            <div className="descreptionMovieModal">
              {modalData.movieDescription}
            </div>
            <p>{modalData.language.toUpperCase()}</p>
            <p>{modalData.rating}</p>
            <span>{modalData.movieId}</span>
            <span>{modalData.releaseDate}</span>
            <Button onClick={handleAddWishList}>Wishlist</Button>
            <Button
              onClick={() => {
                navigate("seat-booking");
              }}
            >
              Book Tickets
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default NowPlaying;
