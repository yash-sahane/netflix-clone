import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    movies: [],
    genres: [],
    genresLoaded : false
}

const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const createArrayFromRawData = (array, moviesArray, genres) => {
  array.map((movie) => {
    const movieGenres = [];
    movie.genre_ids.map((genre) => {
      const genreData = genres.find((item) => item.id === genre);
      if (genreData) movieGenres.push(genreData.name);
    });
    if (movie.backdrop_path) {
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
    }
  });
};

const getRawData = async (api, genres, paging) => {
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
        const { data: { results } } = await axios.get(`${api}${paging ? `&page=${i}` : ''}`);
        createArrayFromRawData(results, moviesArray, genres);
    }
    return moviesArray;
};

export const getMovies = createAsyncThunk('netflix/trending', async ({ type }, { getState }) => {
    const { genres } = getState().netflix;
    return await getRawData(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`, genres, true);
});

export const getMoviesByGenres = createAsyncThunk(
  'netflix/getMoviesByGenres',
    async ({ genre, type }, { getState }) => {
        console.log(genre);
        const { genres } = getState().netflix;
        console.log(`${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`);
    return await getRawData(
      `${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
      genres
    );
  }
);

export const getGenres = createAsyncThunk('netflix/genres', async () => {
    const {data:{genres}} = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    return genres;
});

export const getMyList = createAsyncThunk('netflix/myList', async (email) => {
    const {data:{movies}} = await axios.get(`http://localhost:8080/user/liked/${email}`);
    return movies;
});

const NetflixSlice = createSlice({
    name: 'netflix',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.genresLoaded = true;
        }),
        builder.addCase(getMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        })
        builder.addCase(getMoviesByGenres.fulfilled, (state, action) => {
            state.movies = action.payload;
        })
        builder.addCase(getMyList.fulfilled, (state, action) => {
            state.movies = action.payload;
        })
    }
})

const store = configureStore({
    reducer: {
        netflix: NetflixSlice.reducer
    }
})

export default store;