import { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import { MantineProvider, Text } from "@mantine/core";
//import Navigation from "./components/Navigation/Navigation";
import NowPlaying from "./components/nowPlaying/nowPlaying";
//import Genre from "./components/genre/genre";
import BasicModal from "./components/basicModal";
import Wishlist from "./components/wishlist/wishlist";
//import { UserSignUpForm } from "./components/login-signup/signUp";
import SeatBooking from "./components/seatBooking/seatBooking";
import Checkout from "./components/checkout/checkout";
import UserInfo from "./components/login-signup/userInfo";

//modal context creation
export const MyModalContext = createContext();
//wishList context creation
export const wishListContext = createContext();
//LogedIn user name context creation
export const loggedInUserNameContext = createContext();
//searchMovies context
export const searchMoviesContext = createContext();

const App = () => {
  const [movieList, setMovieList] = useState([]); // -> lifting the state up - state needed by nowPlaying and genre components
  const [selectedGenreItem, setSelectedGenreItem] = useState([]); // -> lifting the state up - state needed by nowPlaying and genre components
  const [movieListBackup, setMovieListBackup] = useState([]);

  //to create modal card
  const [modalData, setModalData] = useState({
    heading: "",
    imageUrl: "",
    movieDescription: "",
    language: "",
    rating: 0,
    movieId: 0,
    releaseDate: "",
  });

  const modalContextValues = {
    movieList,
    modalData,
    setModalData,
    // Add other values or functions here
  };

  //state to display values in wishlist page
  const [wishList, setWishList] = useState([]);
  //wishList context modalContextValues
  const wishListValue = {
    wishList,
    setWishList,
  };

  //LogedIn user name context value
  const [loggedInUserName, setLoggedInUserName] = useState("");

  //search movies context value
  const [movieSearch, setMovieSearch] = useState([]);

  return (
    <searchMoviesContext.Provider value={{ movieSearch, setMovieSearch }}>
      <loggedInUserNameContext.Provider
        value={{ loggedInUserName, setLoggedInUserName }}
      >
        <wishListContext.Provider value={wishListValue}>
          <MyModalContext.Provider value={modalContextValues}>
            <MantineProvider
              withGlobalStyles
              withNormalizeCSS
            ></MantineProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <NowPlaying
                    movieList={movieList}
                    setMovieList={setMovieList}
                    movieListBackup={movieListBackup}
                    setMovieListBackup={setMovieListBackup}
                    selectedGenreItem={selectedGenreItem}
                    setSelectedGenreItem={setSelectedGenreItem}
                  />
                }
              ></Route>
              <Route path="wishlist" element={<Wishlist />}></Route>
              <Route path="modal" element={<BasicModal />}>
                {" "}
              </Route>
              <Route path="login-signup" element={<UserInfo />}>
                {" "}
              </Route>
              <Route path="seat-booking" element={<SeatBooking />}>
                {" "}
              </Route>
              <Route path="checkout" element={<Checkout />}>
                {" "}
              </Route>
            </Routes>
          </MyModalContext.Provider>
        </wishListContext.Provider>
      </loggedInUserNameContext.Provider>
    </searchMoviesContext.Provider>
  );
};

export default App;
