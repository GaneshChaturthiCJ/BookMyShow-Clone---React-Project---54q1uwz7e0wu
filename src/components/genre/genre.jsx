import React from "react";
import { useState, useEffect } from "react";
import "./genre.css";
import "../../components/nowPlaying/nowPlaying.css";
import "../../components/nowPlaying/nowPlaying.jsx";

import handleMovieCardClick from "../handleMovieCardClick.jsx";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjEwMzkxN2YzOWZlMmZkOWMzNThlYTk2ZGY3MTk5NiIsInN1YiI6IjY0OGM0YTMxMDc2Y2U4MDEyNThjZTQ5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Sijg5H7ZHEY_y-LiBY2oBp7t3Icso0uY9cfKoIkcMUY",
  },
};

let genreId = 0;

const Genre = ({ selectedGenreItem, setSelectedGenreItem }) => {
  const [genre, setGenre] = useState([]);

  const handleGenreClick = (event) => {
    genreId = parseInt(event.target.id);
    console.log(genreId);

    const fetchMovieByGenre = async () => {
      const resMovie = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=66103917f39fe2fd9c358ea96df71996&language=en-US&with_genres=${genreId}`
      );
      const res = await resMovie.json();
      setSelectedGenreItem([...res.results]);
    };
    fetchMovieByGenre();

    //console.log(selectedGenreItem, "final genre item");
  };

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.genres);
        setGenre([...data.genres]); // Extracting the genres array from the response data
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="genre">
        {genre.map((genreItem) => (
          <button
            className="glow-on-hover"
            type="button"
            id={genreItem.id}
            key={genreItem.id}
            onClick={handleGenreClick}
          >
            {" "}
            {genreItem.name}{" "}
          </button>
        ))}
      </div>

      <div className="nowPlayingMovieCard">
        {selectedGenreItem.map((item) => {
          return (
            <div className="movie" key={item.id} onClick={handleMovieCardClick}>
              <h3>{item.original_title}</h3>
              <img
                src={"https://image.tmdb.org/t/p/original/" + item.poster_path}
                width="200px"
                height="200px"
                alt="ImgFailed"
              />
              <div className="movieDescription">{item.overview}</div>
              <p>Language: {item.original_language.toUpperCase()}</p>
              <p>Movie Id: {item.id}</p>
              <p>Release Date: {item.release_date}</p>
              <p>⭐ {item.vote_average}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Genre;
