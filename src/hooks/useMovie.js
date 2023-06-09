import { useState } from 'react';
import { fetchMovies } from '../utils/movie-api';
import { fetchNewMovies } from '../utils/movie-api';
import { fetchGenres } from '../utils/movie-api';
import { fetchSearch } from '../utils/movie-api';

export function useMovies(){
    const [genres, setGenres] = useState([]);
    const [movies, setMovies] = useState([]);    
    const [newMovies, setNewMovies] = useState([]);
    const [searchResult, setResults] = useState([]);  
    const [isLoading, setLoading] = useState(false);
    
    const getMovies = async () =>{
        setLoading(true);
        const {data} = await fetchMovies()
        setMovies(data.results);
        setLoading(false);
    }

    const getNewMovies = async () =>{
        setLoading(true);
        const {data} = await fetchNewMovies()
        setNewMovies(data.results);
        setLoading(false);
      }
     
    const getGenres = async () =>{
        const {data} = await fetchGenres()
        setGenres(data.genres);
    }

    const getResults = async (name) => {
        setLoading(true);
        const {data} = await fetchSearch(name);
        setResults(data.results);
        setLoading(false);
    }
    

    return{
        movies,
        genres,
        newMovies,
        searchResult,
        isLoading,
        getMovies,
        getNewMovies,
        getGenres,
        getResults
    }
}