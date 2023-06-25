import React, { useEffect } from 'react'
import{ MovieCard } from '../../components/MovieCard/MovieCard'
import { Carousel } from '../../components/Carousel/Carousel';
import { useMovies } from '../../hooks/useMovie'
import styles from './HomePage.module.css';

export function HomePage() {
  const { movies,newMovies, searchResult, isLoading, getMovies, getNewMovies, getResults} = useMovies(); 

  

  const onChange = () =>{    
    var no = document.getElementById('movieSearchBox').value;
    getResults(no);    
  }

  useEffect(()=>{
    getMovies()
    getNewMovies()

  }, [])

  return (
    <div className={styles.root}>
      <Carousel/>
      <div className={styles.searchBox}>
        <input 
          type='text' 
          name='movieSearch'
          id = 'movieSearchBox'
          className={styles.input}
          placeholder='Nombre de película'
          onChange={onChange}
        />
      </div>
      {searchResult.length == 0 ?(
        <>
          <div className={styles.titleContainer}>      
            <h1 className={styles.title}>NOW PLAYING</h1>  
          </div>  
          <div className={styles.movies}>
            {isLoading && (
              <h1>CARGANDO...</h1>
            )}
            {!isLoading && movies.map((movie)=>{
              movie["profile"] = false;
              return(          
                <MovieCard movie={movie} key={movie.id} />
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
              movie["profile"] = false;
              return(          
                <MovieCard movie={movie} key={movie.id}/>
              )
            })}
          </div> 
        </>
      ):(
        <>          
          <div className={styles.titleContainer}>      
              <h1 className={styles.title}>RESULTADOS DE BÚSQUEDA</h1>  
          </div>
          <div className={styles.movies}>
            {isLoading && (
              <h1>CARGANDO...</h1>
            )}
            {!isLoading && searchResult.map((movie)=>{
              movie["profile"] = false;
              return(          
                <MovieCard movie={movie} key={movie.id}/>
              )
            })}
          </div>
        </>        
      )}
       
      
    </div>    
  )
}
