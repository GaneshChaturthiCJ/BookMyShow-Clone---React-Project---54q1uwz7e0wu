import React from 'react'
import MovieModal from './nowPlaying/movieModal'




const handleMovieCardClick = (event) => {
    console.log(event.currentTarget);
  
    const divData = {
      heading: event.currentTarget.querySelector('h5').innerText,
      imageUrl: event.currentTarget.querySelector('img').getAttribute('src'),
      movieDescription: event.currentTarget.querySelector('.movieDescription').textContent,
      language: event.currentTarget.querySelectorAll('p')[0].textContent,
      rating: event.currentTarget.querySelectorAll('p')[1].textContent,
      movieId: event.currentTarget.querySelectorAll('span')[0].textContent,
      releaseDate: event.currentTarget.querySelectorAll('span')[1].textContent,
    };
  
    console.log(divData);
  };
  
    
        

 export default handleMovieCardClick


//  <div class="movie">
//  <h5>Guy Ritchie's The Covenant</h5>
//  <img src="https://image.tmdb.org/t/p/original//kVG8zFFYrpyYLoHChuEeOGAd6Ru.jpg" width="250px" height="150px" alt="ImgFailed">
//  <div class="movieDescription">During the war in Afghanistan, a local interpreter risks his own life to carry an injured sergeant across miles of grueling terrain.</div>
//  <p>Language: EN</p>
//  <p>⭐  7.7</p>
//  <span>Movie Id: 882569</span>
//  <span>Release Date: 2023-04-19</span>
//  </div>