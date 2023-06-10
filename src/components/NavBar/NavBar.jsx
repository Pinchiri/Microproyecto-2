import { Link, useNavigate } from "react-router-dom";

import { homeURL,
    registerURL,
    loginURL,
    profileURL,
    reserveURL,
    adminURL } from "../../../constants/urls";

// import { useUserContext } from "../../contexts/UserContext";
import styles from "./Navbar.module.css";
// import { logout } from "../../firebase/auth";

export function NavBar() {
  const navigate = useNavigate();
//   const { user, isLoadingUser } = useUserContext();

//   const handleLogout = async () => {
//     await logout(() => navigate(homeURL));
//   };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.menuList}>
        <li className={`${styles.menuItem} ${styles.menuItemLeft}`}>
          <Link to={homeURL} className={styles.link}>
            <span>Personajes</span>
          </Link>
        </li>
        <li className={`${styles.menuItem} ${styles.menuItemLeft}`}>
          <Link to={reserveURL} className={styles.link}>
            <span>Favoritos</span>
          </Link>
        </li>
      </ul>

      {/* {!isLoadingUser && (
        <ul className={styles.menuList}>
          {!!user ? (
            <>
              <li className={`${styles.menuItem} ${styles.menuItemRight}`}>
                <Link to={profileURL} className={styles.link}>
                  <div className={styles.userAvatar} />
                  <span>{user.name}</span>
                </Link>
              </li>
              <li className={`${styles.menuItem} ${styles.menuItemRight}`}>
                <button
                  type="button"
                  className={`${styles.link} ${styles.logoutBtn}`}
                  onClick={handleLogout}
                >
                  <span>Salir</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li className={`${styles.menuItem} ${styles.menuItemRight}`}>
                <Link to={loginURL} className={styles.link}>
                  <span>Iniciar sesión</span>
                </Link>
              </li>
              <li className={`${styles.menuItem} ${styles.menuItemRight}`}>
                <Link to={registerURL} className={styles.link}>
                  <span>Registro</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      )} */}
    </nav>
  );
}