import React from 'react'
import { useState, useEffect } from 'react';
import './genre.css'
import '../../components/nowPlaying/nowPlaying.css'
import '../../components/nowPlaying/nowPlaying.jsx'

 import handleMovieCardClick from '../handleMovieCardClick.jsx'
import MovieModal from '../nowPlaying/movieModal';

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjEwMzkxN2YzOWZlMmZkOWMzNThlYTk2ZGY3MTk5NiIsInN1YiI6IjY0OGM0YTMxMDc2Y2U4MDEyNThjZTQ5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Sijg5H7ZHEY_y-LiBY2oBp7t3Icso0uY9cfKoIkcMUY'
    }
  };


  let genreId = 0;


const Genre = ( {movieList, selectedGenreItem, setSelectedGenreItem} ) => {

    const [genre, setGenre] = useState([]);
    // const [selectedGenreItem, setSelectedGenreItem] = useState([]);
   // const [genreId,setGenreId] = useState(0);

    const handleGenreClick = (event) => {

        //setMovieList([...movieListBackup])

       //setGenreId(parseInt(event.target.id));
       genreId = parseInt(event.target.id);

         setSelectedGenreItem([]);

       //console.log(movieList)

        {
            movieList.map( (item) => {
                    if(item.genre_ids.includes(genreId)){
                       
                        setSelectedGenreItem([...selectedGenreItem, item]);                           
                    }
                     console.log(item)
                    console.log(item.genre_ids, "genre id araay")
                    console.log(genreId, "selected genre id")
                    console.log(item.genre_ids.includes(genreId))
            })
        }
        
         console.log(selectedGenreItem, "final genre item")
        // setMovieList([...selectedGenreItem])
        // console.log(movieList)
    
    }
  
    useEffect(() => {
      fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
        .then(response => response.json())
        .then(data => {
          console.log(data.genres);
          setGenre([...data.genres]); // Extracting the genres array from the response data
        })
        .catch(err => console.error(err));
    }, []);
  
    return (
        <>
      <div className="genre">
        {genre.map((genreItem) => (
          <button className="glow-on-hover" type="button" id={genreItem.id} key={genreItem.id} onClick={handleGenreClick}> {genreItem.name} </button>
        ))}
      </div>


      <div className="nowPlayingMovieCard">

            {selectedGenreItem.length === 0 ? ( 
                <h1 style={{ margin:"auto", marginBottom:"10px", marginTop:"10px", color: "white"  }}>Select by Genre</h1>
        ) : (
        selectedGenreItem.map((item) => {
            return (
            <div className="movie" key={item.id} onClick={handleMovieCardClick }>
                <h3>{item.original_title}</h3>
                <img
                src={"https://image.tmdb.org/t/p/original/" + item.poster_path}
                width="250px"
                height="250px"
                alt="ImgFailed"
                />
                <div className="movieDescription">{item.overview}</div>
                <p>Language: {item.original_language.toUpperCase()}</p>
                <p>⭐ {item.vote_average}</p>
            </div>

            );
        })
        )}
        </div>
        
      </>
    );
  };
  
  export default Genre;
  