import React, { useEffect, useState } from 'react'
import styles from "./Profile.module.css"
import { useUser } from '../../contexts/UserContext';
import { getUserMovies } from '../../firebase/users-service';
import { fetchInfo } from '../../utils/movie-api';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { render } from 'react-dom';

export function Profile() {
  const { user, isLoadingUser } = useUser();

  const [isLoading, setLoading] = useState(false);
  const [moviesArray, setMoviesArray] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  const displayName = (userName) => {
    userName = userName.charAt(0).toUpperCase() + userName.slice(1); 
    return userName
  }

  const getSingleMovie = async (movieId) => {
    setLoading(true)
    const response = await fetchInfo(movieId);
    setLoading(false);
    return response;
  }

  const getFavorites = async () => {
    const favorites = await getUserMovies(user.id);
    const moviesInfo = [];
    for (let index = 0; index < favorites.length; index++) {
      const favoriteID = favorites[index];
      const apiMovie = await getSingleMovie(favoriteID);
      moviesInfo.push(apiMovie);
    }
    
    setMoviesArray(moviesInfo);
    setHasLoaded(true);
  }

  useEffect(() => {
    if (!isLoadingUser && !hasLoaded) {
      getFavorites();
    }
  }, [isLoadingUser, hasLoaded]);

  return (
    <div className={styles.container}>
      <div className={styles.profilePic}></div>
      <div className={styles.userName}>{displayName(user.name)}</div>
      <div className={styles.label}>FAVORITE MOVIES</div>
      <div className={styles.movies}>
        {isLoading && <h1>CARGANDO...</h1>}
        {!isLoadingUser || moviesArray.length === 0 ? (
          <h1 className={styles.noMovies}>No hay películas favoritas</h1>
        ) : (
          moviesArray.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))
        )}
      </div>
    </div>
  );
}