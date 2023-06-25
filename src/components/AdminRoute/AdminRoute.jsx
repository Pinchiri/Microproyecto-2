import React from 'react'
import { useUser } from '../../contexts/UserContext';
import styles from "./AdminRoute.module.css"
import { homeURL } from '../../constants/urls';
import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
    const { user, isLoadingUser } = useUser();

    if (isLoadingUser) {
      return <h1 className={styles.loading}>LOADING USER...</h1>;
    }
  
    if (!isLoadingUser && !user || !isLoadingUser && (user.role !== "admin")) {
      return <Navigate to={homeURL} />;
    }
  
    return children;
}
