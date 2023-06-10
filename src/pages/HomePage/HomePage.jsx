import React, { useEffect } from 'react'
import { useState } from 'react'
import{ MovieCard } from '../../components/MovieCard/MovieCard'
import { fetchMovies } from '../../utils/movie-api'
import styles from './HomePage.module.css';

export function HomePage() {
  const [movies, setMovies] = useState([])
  const [isLoading, setLoading] = useState(false);


  const getMovies = async () =>{
    setLoading(true);
    const {data} = await fetchMovies()
    setMovies(data.results);
    setLoading(false);
    console.log(data.results);
  }

  useEffect(()=>{
    getMovies()
  }, [])

  return (
    <div>
    <div className={styles.titleContainer}>      
      <h1 className={styles.title}>HomePage</h1>  
    </div>  
    <div className={styles.movies}>
      {isLoading && (
        <h1>CARGANDO...</h1>
      )}
      {!isLoading && movies.map((movie)=>{
        console.log(movie.poster_path)
        return(          
          <MovieCard movie={movie} key={movie.id}/>
        )
      })}
    </div>

    
    </div>    
  )
}
