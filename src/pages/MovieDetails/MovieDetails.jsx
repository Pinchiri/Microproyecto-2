import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchInfo } from "../../utils/movie-api";
import { fetchCredits } from "../../utils/movie-api";
import styles from "./MovieDetails.module.css"


export function MovieDetails() {

    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);
    const { movieId } = useParams();
    const [isLoading, setLoading] = useState(false)

    const getSingleMovie = async (movieId) => {
        setLoading(true)
        const response = await fetchInfo(movieId);
        setMovie(response.data)
        console.log(response.data)
        setLoading(false)
    }

    const getCredits = async (movieId) => {
        setLoading(true)
        const response = await fetchCredits(movieId);
        setCredits(response.data)
        console.log(response.data)
        setLoading(false)
    }

    useEffect(() => {
        if (!isLoading && movieId) {
            getSingleMovie(movieId)
            getCredits(movieId)
        }
    }, [])

    if (isLoading) {
        return(
            <div>
                LOADING...
            </div>
        );
    }

    if (!isLoading && movie && credits) {
        return(
            <div className={styles.container}>
                <div>
                    <img src={movie.poster_path != null ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : null} className={styles.image} alt=""/>
                    {movie.status == "Released" ? (
                        <p>Placeholder para el botón</p>
                    ):(
                        <div className={styles.releases}>
                            <h5>PRÓXIMAMENTE!!</h5>
                            <h5>Fecha de Estreno: {movie.release_date}</h5>
                        </div>
                    )}
                    
                </div>
                <div className={styles.infoContainer}>
                    <div>
                        <h1 className={styles.original_title}>{movie.original_title}</h1>
                        <p className={styles.overview}>{movie.overview}</p>
                    </div>

                    <div className={styles.otherInfo}>
                        <div>
                            <h5>
                                Géneros: {movie.genres.map(
                                    (genre) => {return (`${genre.name} `)}
                                )}
                            </h5>
                            <h5>
                                Lenguajes: {movie.spoken_languages.map(
                                (spoken_languages) => {return (`${spoken_languages.english_name} `)}
                            )}</h5>
                            <h5>
                                Duración: {movie.runtime} minutos
                            </h5>
                        </div>                        
                    </div>

                    <div>
                        <div>
                            <h5>Actores: </h5>
                            <ul className={styles.actorList}>
                                {credits.cast.map((actor) => {
                                    if(actor.known_for_department == "Acting"){                                                
                                            return(                                            
                                                <li>{actor.name}</li>
                                            );
                                        }                                        
                                    })
                                }
                            </ul>
                        </div>  
                    </div>    
                </div>
            </div>
        );
    }
}