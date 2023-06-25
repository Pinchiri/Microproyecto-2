import React, { useEffect, useState } from 'react'
import { getAllUsersReservations } from '../../firebase/reserveManagement';
import styles from "./AdminPage.module.css"
import ReserveCard from '../../components/ReserveCard/ReserveCard';

export default function AdminPage() {

    const [allReservations, setAllReservations] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const getAllReservations = async () => {
        const reservations = await getAllUsersReservations();
        setAllReservations(reservations);

    }

    useEffect(() => {
        getAllReservations();
    }, []);
    
  return (
    <div className={styles.container}>
        <div className={styles.label}>ALL RESERVES</div>
          <div className={styles.reserves}>
            {isLoading && (
              <h1>CARGANDO...</h1>
            )}
            {!isLoading && allReservations.length > 0 && allReservations.map((reservation)=>{
              return(          
                <ReserveCard reservation={reservation} />
              )
            })}
          </div>
    </div>
  )
}
