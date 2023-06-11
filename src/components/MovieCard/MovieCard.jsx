import React, {useEffect} from "react"
import styles from './MovieCard.module.css';
import { useMovies } from '../../hooks/useMovie'
import { Link } from "react-router-dom";

export function MovieCard( {movie}){
    const {genres, getGenres} = useMovies();

    useEffect(()=>{
        getGenres()
      }, [])
          
    let generos = "";

    if(genres.length!=0){        
        for(let i = 0; i < movie.genre_ids.length; i++){
            for(let j = 0; j < genres.length; j++){
                if(movie.genre_ids[i] == genres[j].id){
                    generos += `${genres[j].name} `;
                }
            }
        }
    }

    return(
        <div className={styles.cardContainer}>
            <div>
                <img                    
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.original_title}
                    className={styles.image}
                />                
            </div>
            <div className={styles.rightContainer}>
                <div className={styles.infoContainer}>
                    <p className={styles.big}>
                        <Link to={`/movies/${movie.id}`} className={styles.link}>                            
                            {movie.original_title}
                        </Link>
                    </p>
                    <p className={styles.medium}>
                        {`Lenguaje: ${movie.original_language}`}
                    </p>
                    <p className={styles.medium2}>
                        Géneros:
                    </p>
                    <div id="Genre Container">
                        {generos}
                    </div>
                </div>
            </div>
        </div>
    )
}
