import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { homeURL, registerURL } from "../../constants/urls";
import { useState } from 'react';
import {
  emailPasswordLogin,
  googleLogin,
 } from "../../firebase/auth-service";

export function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
  
    const onSuccess = () => {
      navigate(homeURL);
    };
  
    const onFail = (_error) => {
      console.log("LOGIN FAILED, Try Again");
    };
  
    const onSubmit = async (event) => {
      event.preventDefault();
  
      await emailPasswordLogin({ userData: formData, onSuccess, onFail });
    };
  
    const onChange = (event) => {
      const { name, value } = event.target;
  
      setFormData((oldData) => ({ ...oldData, [name]: value }));
    };
  
    const handleGoogleClick = async () => {
      await googleLogin({
        onSuccess: () => navigate(homeURL),
      });
    };
  
    return (
      <div className={styles.container}>
        <form className={styles.form} onSubmit={onSubmit}>
          <h1 className={styles.title}>Reserve from anywhere</h1>
          <p className={styles.welcomeTxt}>
            Log in to make a reservation
          </p>
  
          {/* EMAIL FIELD */}
          <div className={styles.inputContainer}>
            <label htmlFor="email">
              <span>Email</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Eg. sorrentino@gmail.com"
              onChange={onChange}
            />
          </div>
  
          {/* PASSWORD FIELD */}
          <div className={styles.inputContainer}>
            <label htmlFor="password">
              <span>Password</span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              onChange={onChange}
            />
          </div>
  
          <button type="submit" className={styles.submitBtn}>
            LOG IN
          </button>
  
          <button
            type="button"
            className={styles.googleBtn}
            onClick={handleGoogleClick}
          >
            LOG IN WITH GOOGLE
          </button>
  
          <Link to={registerURL} className={styles.loginRedirect}>
            No account?{" "}
            <span className={styles.redirectLink}>Sign up</span>
          </Link>
        </form>
      </div>
    );
}
