import React from 'react';
import { wishListContext } from '../../App';
import { useContext } from 'react';

import '../nowPlaying/nowPlaying.css';
import '../wishlist/wishlist.css';

const Wishlist = () => {
    const { wishList } = useContext(wishListContext);

    return (
        <>
            {wishList.length <= 0 ? (
                <div className='wishlistMsg'>
                    <h1>ADD YOUR FAV HERE</h1>
                </div>
            ) : (
                <>
                    <h1 className='wishlistHeading'>YOUR WISHLIST</h1>
                    {wishList.map((item) => (
                        <div className='nowPlaying' key={item.movieId}>
                            <div className='nowPlayingMovieCard'>
                                <div className='movie'>
                                    <h5>{item.heading}</h5>
                                    <div className='modalImage'>
                                        <img src={item.imageUrl} width='250px' height='190px' alt='ImgFailed' />
                                    </div>
                                    {/* <div className='movieDescription'>{item.movieDescription}</div> */}
                                    <p>{item.language.toUpperCase()}</p>
                                    <p>{item.rating}</p>
                                    <span>{item.movieId}</span>
                                    <span>{item.releaseDate}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </>
    );
};

export default Wishlist;


{/* <div className="nowPlaying" >
<h1 style={{ color:"white",  marginBottom:"10px", marginLeft:"10px", justifyContent: "center" }}>Now Playing</h1>
<div className="nowPlayingMovieCard" onClick={handleOpen}>
    {movieList.map((movie) => {
        return (
            <div className="movie"  onClick={handleMovieCardClick} >
                <h5>{movie.original_title}</h5>
                <img src={"https://image.tmdb.org/t/p/original/" + movie.poster_path } width="250px" height="150px" alt="ImgFailed" />
                <div className="movieDescription">{movie.overview}</div>
                <p>Language: {movie.original_language.toUpperCase()}</p>
                <p>⭐  {movie.vote_average}</p>
                <span>Movie Id: {movie.id}</span>
                <span>Release Date: {movie.release_date}</span>
            </div>
        )
    })}

</div>
<div className='nowPlayingPagination'>
    <Pagination value={activePage} onChange={setPage} total={10}  />
    
</div>
</div> */}
