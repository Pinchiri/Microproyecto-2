import { Navigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { loginURL } from "../../constants/urls";
import styles from "./PrivateRoute.module.css";

export function PrivateRoute({ children }) {
  const { user, isLoadingUser } = useUser();

  if (isLoadingUser) {
    return <h1 className={styles.loading}>LOADING USER...</h1>;
  }

  if (!isLoadingUser && !user) {
    return <Navigate to={loginURL} />;
  }

  return children;
}