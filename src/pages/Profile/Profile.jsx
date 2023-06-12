import React from 'react'
import styles from "./Profile.module.css"
import { useUser } from '../../contexts/UserContext';

export function Profile() {
  const { user, isLoadingUser } = useUser();

  const displayName = (userName) => {
    userName = userName.charAt(0).toUpperCase() + userName.slice(1); 
  }

  return (
    <div className={styles.container}>
      <div className={styles.profilePic}>
        
      </div>
      <div className={styles.userName} > {user.name} </div>

      <div className={styles.label} >FAVORITE MOVIES</div>
      
      <div className={styles.movies}>

      </div>
      

    </div>
  )
}
