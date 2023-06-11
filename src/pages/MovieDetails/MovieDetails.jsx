import React, {useEffect} from "react"
import { useMovies } from '../../hooks/useMovie';
import { styles } from './MovieDetails.module.css';

export function MovieDetails( {movie} ){
    const{info, getInfo} = useMovies();

    useEffect(()=>{
        getInfo(movie.id)
    }, [])

    
}