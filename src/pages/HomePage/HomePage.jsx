import React, { useEffect } from 'react'
import { useState } from 'react'
import{ MovieCard } from '../../components/MovieCard/MovieCard'
import { fetchNewMovies } from '../../utils/movie-api'
import styles from './HomePage.module.css';

export function HomePage() {
  const [movies, setMovies] = useState([])
  const [isLoading, setLoading] = useState(false);


  const getNewMovies = async () =>{
    setLoading(true);
    const {data} = await fetchNewMovies()
    setMovies(data.results);
    setLoading(false);
  }

  useEffect(()=>{
    getNewMovies()
  }, [])

  return (
    <div>
      <div className={styles.titleContainer}>      
        <h1 className={styles.title}>EN CARTELERA</h1>  
      </div>  
      <div className={styles.movies}>
        {isLoading && (
          <h1>CARGANDO...</h1>
        )}
        {!isLoading && movies.map((movie)=>{
          return(          
            <MovieCard movie={movie} key={movie.id}/>
          )
        })}
      </div>
      
      <div className={styles.titleContainer}>      
        <h1 className={styles.title}>PRÓXIMOS ESTRENOS</h1>  
      </div>  
      
    </div>    
  )
}
