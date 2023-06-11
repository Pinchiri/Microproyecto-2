import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { fetchInfo } from "../../utils/movie-api";
//import defaultImg from "./../../imgs/defaultImg.jpg";
import styles from "./MovieDetails.module.css"


export function MovieDetails() {

    const [movie, setMovie] = useState(null);
    const { movieId } = useParams();
    const [isLoading, setLoading] = useState(false)

    const getSingleMovie = async (movieId) => {
        setLoading(true)
        const response = await fetchInfo(movieId);
        setMovie(response.data)
        setLoading(false)
    }

    useEffect(() => {
        if (!isLoading && movieId) {
            getSingleMovie(movieId)
        }
    }, [])

    if (isLoading) {
        return(
            <div>
                LOADING...
            </div>
        );
    }

    if (!isLoading && movie) {
        return(
            <div className={styles.container}>
                <div className="my-5">
                    <img src={movie.poster_path != null ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : null} className={styles.image} alt=""/>
                </div>

                <div className={styles.infoContainer}>
                    <div className="mt-5">
                        <h1 className={styles.original_title}>{movie.original_title}</h1>
                        <p className={styles.overview}>{movie.overview}</p>
                    </div>

                    <div className={styles.otherInfo}>
                        <div className="p-4">
                            <h5 className="text-light mb-3">Genres: {movie.genres.map(
                                    (genre) => {return (`${genre.name}, `)}
                                )}
                            </h5>
                            <h5 className="text-light my-3">Original Language: {movie.original_language}</h5>
                            <h5 className="text-light mt-3">Presupuesto: {movie.budget}</h5>
                        </div>
                        <div className="p-4">
                            <h5 className="text-light mb-3">Rating: {movie.popularity}</h5>
                            <h5 className="text-light my-3">Release date: {movie.release_date}</h5>
                            <h5 className="text-light mt-3">Status: {movie.status}</h5>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center">
                        <div className="mx-3 mb-5">
                            <h5 className="text-light">Producers: </h5>
                            <ul className="text-light mt-3">
                                {movie.production_companies.map((company) => {
                                        return(
                                            <li className={`my-2 ${styles.listLook}`}>{company.name}</li>
                                        );
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