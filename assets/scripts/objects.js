const addMovieBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById("search-btn");

const movies = [];

const renderMovies = (filterTitle = "") => {
  const movieList = document.getElementById("movie-list");

  if (movies.length === 0) {
    movieList.classList.remove("visible");
    return;
  } else {
    movieList.classList.add("visible")
  }

  movieList.innerHTML = "";

  // filter
  const filteredMovies = !filterTitle
      ? movies
      : movies.filter((movie) => movie.info.title.includes(filterTitle));

  filteredMovies.forEach((movie) => {
    const movieEl = document.createElement("li");
    const {info, ...otherProps } = movie;
    // console.log(otherProps, 'otherProps')
    // const {title: movieTitle} = info;
    let { getFormattedTitle } = movie;
    // getFormattedTitle = getFormattedTitle.bind(movie)
    let text = getFormattedTitle.apply(movie, []) + "-";
    for (const key in info) {
      if (key !== 'title') {
        text = text + `${key}: ${info[key]}`
      }
    }
    movieEl.textContent = text;
    movieList.append(movieEl);
  })
}

const handleMovieAdd = () => {
  const title = document.getElementById("title").value;
  const extraName = document.getElementById("extra-name").value;
  const extraValue = document.getElementById("extra-value").value;

  if (title.trim() === "" ||
      extraName.trim() === "" ||
      extraValue.trim() === ""
  ) {
    return;
  }

  const newMovie = {
    info: {
      title,
      [extraName]: extraValue
    },
    id: Math.random(),
    getFormattedTitle: function () {
      return this.info.title.toUpperCase();
    }
  }
  const newMovie2 = {
    info: {
      set title(val) {
        if (val.trim() === "") {
          this._title = "DEFAULT";
          return;
        }
        this._title = val;
      },
      get title() {
        return this._title.toUpperCase();
      },
      [extraName]: extraValue
    },
    id: Math.random().toString()
  }

  newMovie2.info.title = title;
  console.log(newMovie2.info.title);

  movies.push(newMovie);
  console.log(newMovie);
  renderMovies();
}
const handleSearchMovies = () => {
  const filterTitle = document.getElementById("filter-title").value;
  renderMovies(filterTitle);
}
addMovieBtn.addEventListener("click", handleMovieAdd);
searchBtn.addEventListener("click", handleSearchMovies);