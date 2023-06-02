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
      const name = genres.find((id) => id === genre);
      if (name) movieGenres.push(name.name);
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
        console.log(results);
        createArrayFromRawData(results, moviesArray, genres);
    }
    return moviesArray;
};

export const getMovies = createAsyncThunk('netflix/trending', async ({ type }, { getState }) => {
    const { genres } = getState().netflix;
    return await getRawData(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`, genres, true);
//   console.log(data);
});

export const getGenres = createAsyncThunk('netflix/genres', async () => {
    const {data:{genres}} = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    console.log(genres);
    return genres;
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
    }
})

const store = configureStore({
    reducer: {
        netflix: NetflixSlice.reducer
    }
})

export default store;