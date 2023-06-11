import React from "react"
import styles from './MovieCard.module.css';

export function MovieCard( {movie} ){
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
                        {movie.original_title}
                    </p>
                    <p className={styles.medium}>
                        {`Lenguaje: ${movie.original_language}`}
                    </p>
                    <h3>

                    </h3>
                </div>
            </div>
        </div>
    )
}
