import React, { useEffect, useState } from 'react'
import styles from "./Profile.module.css"
import { useUser } from '../../contexts/UserContext';
import { getUserMovies } from '../../firebase/users-service';
import { fetchInfo } from '../../utils/movie-api';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { render } from 'react-dom';
import { getUserReservations } from '../../firebase/reserveManagement';
import ReserveCard from '../../components/ReserveCard/ReserveCard';

export function Profile() {
  const { user, isLoadingUser } = useUser();

  const [isLoading, setLoading] = useState(false);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [reservations, setReservations] = useState([]);

  const [hasLoaded, setHasLoaded] = useState(false);

  const profile = "true";

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
      moviesInfo.push(apiMovie.data);
      
    }
    
    setFavoriteMovies(moviesInfo);

    setHasLoaded(true);
  }

  const getReservations = async () => {
    const reserves = await getUserReservations(user.id);
    
    setReservations(reserves);
    setHasLoaded(true);
  }

  useEffect(() => {
      getFavorites();
      getReservations();

  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.profilePic}></div>
      <div className={styles.userName}>{displayName(user.name)}</div>
      <div className={styles.label}>FAVORITE MOVIES</div>
      <div className={styles.movies}>
            {isLoading && (
              <h1>CARGANDO...</h1>
            )}
            {!isLoading && favoriteMovies.length > 0 && favoriteMovies.map((movie)=>{
              movie["profile"] = true;
              return(          
                <MovieCard movie={movie} key={movie.id} profile={profile}/>
              )
            })}
          </div>
      
          <div className={styles.label}>RESERVES</div>
          <div className={styles.reserves}>
            {isLoading && (
              <h1>CARGANDO...</h1>
            )}
            {!isLoading && reservations.length > 0 && reservations.map((reservation)=>{
              return(          
                <ReserveCard reservation={reservation} />
              )
            })}
          </div>
    </div>
        
  );
}