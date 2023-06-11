import React from "react";
import styles from './CElement.module.css'
import image1 from './1.jpg'
import image2 from './2.jpg'
import image3 from './3.jpg'
import image4 from './4.jpg'
import image5 from './5.jpg'

export function CElement(props){
    return(
        <div className={styles.element}>
            {props.no == '1' ? (                             
            <img src={image1} className={styles.image}/>
            ):("")}
            {props.no == '2' ? (                             
            <img src={image2} className={styles.image}/>
            ):("")}
            {props.no == '3' ? (                             
            <img src={image3} className={styles.image}/>
            ):("")}
            {props.no == '4' ? (                             
            <img src={image4} className={styles.image}/>
            ):("")}
            {props.no == '5' ? (                             
            <img src={image5} className={styles.image}/>
            ):("")}
        </div>
    )
}