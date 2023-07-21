import React from 'react';
import { wishListContext } from '../../App';
import { useContext } from 'react';

import '../nowPlaying/nowPlaying.css';
import '../wishlist/wishlist.css';

const Wishlist = () => {
  const { wishList, setWishList } = useContext(wishListContext);

  const clearWishlist = () => {
    setWishList([]);
  };

  return (
    <>
      {wishList.length <= 0 ? (
        <div className="wishlistMsg">
          <h1>ADD YOUR FAV HERE</h1>
        </div>
      ) : (
        <>
          <h1 className="wishlistHeading">YOUR WISHLIST</h1>

          <button className="wishlistClear" onClick={clearWishlist}>
            Clear Wishlist{" "}
          </button>

          <div className="wishListOuterDiv">
            {wishList.map((item) => (
              <div className="nowPlayingg" key={item.movieId}>
                <div className="movie">
                  <h5>{item.heading}</h5>
                  <div className="modalImage">
                    <img
                      src={item.imageUrl}
                      width="250px"
                      height="190px"
                      alt="ImgFailed"
                    />
                  </div>
                  <div className="movieDescription">
                    {item.movieDescription}
                  </div>
                  <p>{item.language.toUpperCase()}</p>
                  <p>{item.rating}</p>
                  <span>{item.movieId}</span>
                  <span>{item.releaseDate}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Wishlist;



