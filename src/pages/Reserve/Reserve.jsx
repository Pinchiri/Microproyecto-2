import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./Reserve.module.css";
import { homeURL, loginURL } from "../../constants/urls";

import { useState } from "react";
import { SeatsGrid } from '../../components/SeatsGrid/SeatsGrid';
import { createMovieFunction, createReservation } from '../../firebase/reserveManagement';
import { useUser } from '../../contexts/UserContext';
import { useMovies } from '../../hooks/useMovie';
import { fetchInfo } from "../../utils/movie-api";

export function Reserve() {
    const navigate = useNavigate();
    const [formData, setData] = useState({});
    const { movieId } = useParams();
    const { user, isLoadingUser } = useUser();
    const [selectedSeats, setSelectedSeats] = useState([]);

    const [isLoading, setLoading] = useState(false);
    const [movie, setMovie] = useState(null);
    const [ticketPrice, setTicketPrice] = useState(0);

    const [total, setTotal] = useState(0);
    
    const getSingleMovie = async (movieId) => {
        setLoading(true)
        const response = await fetchInfo(movieId);
        setMovie(response.data)
        setLoading(false)
    }

    const handleSelectedSeats = (seats) => {
        setSelectedSeats(seats);
        calculateCosts();
    };
  
    const onSuccess = () => {
      navigate(homeURL);
    };

    const onFail = (_error) => {
      console.log("REGISTER FAILED, Try Again");
    };
  
    const handleSubmit = async (event) => {
        event.preventDefault();

        
        
        const functionData = {};
        const {email, ...extraData} = formData;
        functionData["id"] = movieId;
        formData["uid"] = user.id;
        formData["ticketQuantity"] = selectedSeats.length
        formData["totalCost"] = total;
        formData["movieTitle"] = movie["original_title"];
        
        if (formData["name"] == undefined || formData["email"] == undefined || formData["ci"] == undefined ) {
            window.alert("You have to fill the form to make the reservation");
            return;
        }
        
        if (selectedSeats.length < 1) {
            window.alert("You have to choose a seat");
            return;
        }

        for (let index = 0; index < selectedSeats.length; index++) {
            const seat = selectedSeats[index];

            functionData[seat] = false; 
        }

        createReservation(formData);
        createMovieFunction(functionData);
        window.alert("You have succesfully reserved! " + `\nThe Total Cost of your tickets is: $${total}`);
        navigate(homeURL);
    };
  
    const whenChange = (event) => {
      const {name, value} = event.target;

      setData((oldData) => ({
        ...oldData,
        [name]: value,
      }));
    };

    function calculateCosts() {
        const totalCost = ticketPrice * selectedSeats.length;
        setTotal(totalCost);
    }

    useEffect(() => {
        const random = Math.floor(Math.random() * 4001) + 1000; // Genera un número aleatorio entre 1000 y 5000
        setTicketPrice(random);
    }, [])

    useEffect(() => {
        if (!isLoading && movieId) {
            getSingleMovie(movieId) 
        }
      
    }, [])

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
            <div className={styles.choose}>
                Choose your seats (Max. 5)
            </div>
            <div className={styles.price}>
                {`Ticket Price: $${ticketPrice}`} 
            </div>
            {/*Tickets Quantity*/}
            <div className={styles.seatsGrid}>
                <SeatsGrid handleSelected = {handleSelectedSeats} onChange={whenChange} />
            </div>
            {/* <p className={styles.welcomeTxt} onChange={whenChange}>
                The tickets total price is ${total}
            </p> */}
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
