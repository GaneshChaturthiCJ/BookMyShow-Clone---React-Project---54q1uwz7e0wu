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

  console.log(divData);
};

export default handleMovieCardClick;
