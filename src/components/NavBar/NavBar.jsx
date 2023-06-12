import { Link, useNavigate } from "react-router-dom";

import { homeURL,
    registerURL,
    loginURL,
    profileURL,
    reserveURL,
    adminURL } from "../../constants/urls";

import styles from "./Navbar.module.css";
import { logout } from "../../firebase/auth-service";
import { useUser } from "../../contexts/UserContext";
import logo from "./Logo.png";

export function NavBar() {
  const navigate = useNavigate();
  const { user, isLoadingUser } = useUser();

  const displayName = (userName) => {
    if (user.name.includes(" ")) {
      userName = userName.split(" ")[0].charAt(0).toUpperCase() + userName.split(" ")[0].slice(1);
      return userName;
    } else {
      userName = userName.charAt(0).toUpperCase() + userName.slice(1);
      return userName;
    }
    
  }

  const handleLogout = async () => {
    await logout(() => navigate(homeURL));
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.menuList}>
        <li className={`${styles.menuItem} ${styles.menuItemLeft}`}>
          <Link to={homeURL} className={styles.link}>
            <img src={logo} className={styles.logo} />
            {/* <span>Home</span> */}
          </Link>
        </li>
      </ul>

      {!isLoadingUser && (
        <ul className={styles.menuList}>
          {!!user ? (
            <>
              <li className={`${styles.menuItem} ${styles.loggedUser}`}>
                <Link to={profileURL} className={styles.link}>
                  <div className={styles.userMarker} />
                  <span>{displayName(user.name)}</span>
                </Link>
              </li>
              <li className={`${styles.menuItem} ${styles.menuItemRight}`}>
                <button
                  type="button"
                  className={`${styles.link} ${styles.logoutBtn}`}
                  onClick={handleLogout}
                >
                  <span>LOGOUT</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li className={`${styles.menuItem} ${styles.menuItemRight}`}>
                <Link to={loginURL} className={styles.link}>
                  <span>LOG IN</span>
                </Link>
              </li>
              <li className={`${styles.menuItem} ${styles.menuItemRight}`}>
                <Link to={registerURL} className={styles.link}>
                  <span>SIGN UP</span>
                </Link>
              </li>
            </>
          )}
        </ul>
        )}
    </nav>
  );
}