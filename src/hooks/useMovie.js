import { useState } from 'react'
import { fetchMovies } from '../utils/movie-api'
import { fetchNewMovies } from '../utils/movie-api';

export function useMovies(){
    
    const [movies, setMovies] = useState([]);    
    const [newMovies, setNewMovies] = useState([]);  
    const [isLoading, setLoading] = useState(false);
    
    const getMovies = async () =>{
        setLoading(true);
        const {data} = await fetchMovies()
        setMovies(data.results);
        setLoading(false);
        console.log(data.results);
    }

    const getNewMovies = async () =>{
        setLoading(true);
        const {data} = await fetchNewMovies()
        setNewMovies(data.results);
        setLoading(false);
        console.log(data.results);
      }

    return{
        movies,
        newMovies,
        isLoading,
        getMovies,
        getNewMovies
    }
}