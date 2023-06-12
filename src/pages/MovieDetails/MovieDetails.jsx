import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { fetchInfo } from "../../utils/movie-api";
import { fetchCredits } from "../../utils/movie-api";
import styles from "./MovieDetails.module.css"
import { homeURL, reserveURL } from "../../constants/urls";
import { useUser } from "../../contexts/UserContext";
import { updateUserFavorites } from "../../firebase/users-service";


export function MovieDetails() {

    const { user, isLoadingUser } = useUser(); 
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);
    const { movieId } = useParams();
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    

    const getSingleMovie = async (movieId) => {
        setLoading(true)
        const response = await fetchInfo(movieId);
        setMovie(response.data)

        setLoading(false)
    }

    const getCredits = async (movieId) => {
        setLoading(true)
        const response = await fetchCredits(movieId);
        setCredits(response.data)

        setLoading(false)
    }

    const handleSubmit =  (event) => {
        event.preventDefault();
        navigate(`/reserve/${movieId}`);
 
      };
    
      const handleFavorite = async (event) => {
        event.preventDefault();
        await updateUserFavorites(user.id, movieId);
 
      };

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
                <div className={styles.infoGen}>
                    <img src={movie.poster_path != null ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : null} className={styles.image} alt=""/>
                    {movie.status == "Released" ? (
                        <button
                        type="button"
                        className={`${styles.link} ${styles.reserveButton}`}
                        onClick={handleSubmit}
                        >
                        <span>RESERVE</span>
                      </button>
                        
                    ):(
                        <div className={styles.releases}>
                            <h5>UPCOMING!!</h5>
                            <h5>Release Date: {movie.release_date}</h5>
                        </div>
                    )}
                    <button
                        type="button"
                        className={`${styles.link} ${styles.favoriteButton}`}
                        onClick={handleFavorite}
                        >
                        <span>ADD TO FAVORITES</span>
                      </button>
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.info}>
                        <h1 className={styles.title}>{movie.original_title}</h1>
                        <p className={styles.overview}>{movie.overview}</p>
                    </div>

                    <div className={styles.otherInfo}>
                        <div>
                            <h5>
                                Genres: {movie.genres.map(
                                    (genre) => {return (`${genre.name} `)}
                                )}
                            </h5>
                            <h5>
                                Languages: {movie.spoken_languages.map(
                                (spoken_languages) => {return (`${spoken_languages.english_name} `)}
                            )}</h5>
                            <h5>
                                Duration: {movie.runtime} minutes
                            </h5>
                        </div>                        
                    </div>

                    <div>
                        <div className={styles.listContainer}>
                            <h5 className={styles.overview}>Actors: </h5>
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