import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import styles from "./Reserve.module.css";
import { homeURL, loginURL } from "../../constants/urls";

import { useState } from "react";
import { SeatsGrid } from '../../components/SeatsGrid/SeatsGrid';

export function Reserve() {
    const navigate = useNavigate();
    const [formData, setData] = useState({});

    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleSelectedSeats = (seats) => {
        setSelectedSeats(seats);
    };
  
    const onSuccess = () => {
      navigate(homeURL);
    };

    const onFail = (_error) => {
      console.log("REGISTER FAILED, Try Again");
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();

      console.log(selectedSeats);
      const {email, password, ...extraData} = formData;
      

    };
  
    const whenChange = (event) => {
      const {name, value} = event.target;
  
      setData((oldData) => ({
        ...oldData,
        [name]: value,
      }));
    };

  return (
    <div>
        <div className={styles.container}>
            <form className={styles.form}>
            <h1 className={styles.title}>Get tickets</h1>
            <p className={styles.welcomeTxt}>
                Hurry up and get your tickets!
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
                placeholder="Eg. Rolando"
                onChange={whenChange}
                />
            </div>

            <div className={styles.inputContainer}>
                <label htmlFor="ci">
                <span>Identity Card</span>
                </label>
                <input
                type="text"
                name="ci"
                id="ci"
                placeholder="Eg. 28315109"
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

            {/*Tickets Quantity*/}
            <div className={styles.seatsGrid}>
                <SeatsGrid handleSelected = {handleSelectedSeats} />
            </div>

            <button
                type="submit"
                className={styles.submitBtn}
                onClick={handleSubmit}
            >
                GET TICKETS
            </button>
            <Link to={homeURL} className={styles.loginRedirect}>
                Watch the movies on {" "}
                <span className={styles.redirectLink}>billboard</span>
            </Link>
            </form>
        </div>
    </div>
  )
}
