import React from 'react'
import styles from "./ReserveCard.module.css"

export default function ReserveCard({reservation}) {
  return (
    <div className={styles.cardContainer}> 

            <div className={styles.rightContainer}>
                <div className={styles.titleContainer}>
                    <p className={styles.big}>                                       
                            {reservation.movieTitle}    
                    </p>
                </div>
                <div className={styles.infoContainer}>
                    <p className={styles.medium}>
                        {reservation.name}
                    </p>
                    <p className={styles.medium}>
                        {reservation.email}
                    </p>
                    <p className={styles.medium}>
                        {`CI: ${reservation.ci}`}
                    </p>
                    
                    <p className={styles.medium}>
                        {`Tickets: ${reservation.ticketQuantity}`}
                    </p>
                    <p className={styles.medium}>
                        {`Total cost: $${reservation.totalCost}`}
                    </p> 
                </div>
                            
                
            </div>
        </div>
  )
}
