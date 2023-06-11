import React from 'react';
import { CElement } from './CElement';
import styles from './Carousel.module.css';

export function Carousel(){
    let box = document.getElementById('container')

    const pressPrevious = () =>{
        let width = box.clientWidth;
        box.scrollLeft = box.scrollLeft - width
    }

    const pressNext = () =>{
        let width = box.clientWidth;
        box.scrollLeft = box.scrollLeft + width
    }

    return(
        <div className={styles.carousel}>
            <button className={styles.previous_btn} onClick={pressPrevious}><p>&lt;</p></button>
            <button className={styles.next_btn} onClick={pressNext}><p>&gt;</p></button>

            <div className={styles.container} id='container'>
                <CElement no='1'/>
                <CElement no='2'/>
                <CElement no='3'/>
                <CElement no='4'/>
                <CElement no='5'/>
            </div>
        </div>
    )
}