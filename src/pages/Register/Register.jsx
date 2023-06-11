import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { homeURL, loginURL } from "../../constants/urls";
import {
  emailPasswordRegister,
  googleLogin,
} from "../../firebase/auth-service";
import { useState } from "react";

export function Register() {
  const navigate = useNavigate();
  const [formData, setData] = useState({});

  const onSuccess = () => {
    navigate(homeURL);
  };

  const onFail = (_error) => {
    console.log("REGISTER FAILED, Try Again");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {email, password, ...extraData} = formData;
    
    await emailPasswordRegister({
      userData: formData,
      onSuccess,
      onFail,
    });
  };

  const handleGoogleClick = async () => {
    await googleLogin({
      onSuccess: () => navigate(homeURL),
    });
  };

  const whenChange = (event) => {
    const {name, value} = event.target;

    setData((oldData) => ({
      ...oldData,
      [name]: value,
      favorites: [],
      role: "regular",
    }));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1 className={styles.title}>Create an account</h1>
        <p className={styles.welcomeTxt}>
          Sign up to make a reservation 
        </p>

        {/*Name*/}
        <div className={styles.inputContainer}>
          <label htmlFor="name">
            <span>Full Name</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Eg. Tomás Gil"
            onChange={whenChange}
          />
        </div>

        {/*Email*/}
        <div className={styles.inputContainer}>
          <label htmlFor="email">
            <span>Email</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Eg. sorrentino@gmail.com"
            onChange={whenChange}
          />
        </div>

        {/*Password*/}
        <div className={styles.inputContainer}>
          <label htmlFor="password">
            <span>Password</span>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********"
            onChange={whenChange}
          />
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          onClick={handleSubmit}
        >
          SIGN UP
        </button>

        <button
          type="button"
          className={styles.googleBtn}
          onClick={handleGoogleClick}
        >
          SIGN UP WITH GOOGLE
        </button>

        <Link to={loginURL} className={styles.loginRedirect}>
          Have an account?{" "}
          <span className={styles.redirectLink}>Log in</span>
        </Link>
      </form>
    </div>
  );
}