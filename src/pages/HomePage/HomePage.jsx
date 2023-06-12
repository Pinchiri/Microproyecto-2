import React, { useEffect } from 'react'
import{ MovieCard } from '../../components/MovieCard/MovieCard'
import { Carousel } from '../../components/Carousel/Carousel';
import { useMovies } from '../../hooks/useMovie'
import styles from './HomePage.module.css';

export function HomePage() {
  const { movies,newMovies, isLoading, getMovies, getNewMovies} = useMovies(); 

  useEffect(()=>{
    getMovies()
    getNewMovies()
  }, [])

  return (
    <div className={styles.root}>
      <Carousel/>
      <div className={styles.titleContainer}>      
        <h1 className={styles.title}>NOW PLAYING</h1>  
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
        <h1 className={styles.title}>UPCOMING</h1>  
      </div>

      <div className={styles.movies}>
        {isLoading && (
          <h1>CARGANDO...</h1>
        )}
        {!isLoading && newMovies.map((movie)=>{
          return(          
            <MovieCard movie={movie} key={movie.id}/>
          )
        })}
      </div>  
      
    </div>    
  )
}
