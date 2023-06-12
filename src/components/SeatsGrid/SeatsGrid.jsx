import { useEffect, useState } from 'react';
import styles from "./SeatsGrid.module.css";

export function SeatsGrid({ handleSelected }) {
    const maxCapacity = 5;
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        handleSelected(selected);
      }, [selected, handleSelected]);
    
      const handleClick = (seat) => {
        if (selected.includes(seat)) {
          setSelected(selected.filter((s) => s !== seat));
        } else {
          if (selected.length < maxCapacity) {
            setSelected([...selected, seat]);
          }
        }
      };
    
    

    const isSelected = (seat) => {
        return selected.includes(seat);
    };

    const displaySeats = () => {
        const rows = [0, 4, 8, 12, 16];
        const columns = [1, 2, 3, 4];

        const totalSeats = 20;
        let seatsOccupied = 1;


        let theatreMapped = [];

        for (let row of rows) {
            let rowSeats = [];
            for (let col of columns) {
                const seat = `${col+row}`;
                const disabled = seatsOccupied > totalSeats;
                const selectedSeat = isSelected(seat);
                rowSeats.push(
                    <div key={seat} className={`${styles.seat} ${selectedSeat ? styles.selected : ''} ${disabled ? styles.disabled : ''}`} onClick={() => !disabled && handleClick(seat)}>
                        {seat}
                    </div>
                );
                seatsOccupied++;
            }
            theatreMapped.push(<div className={styles.row} key={row}>{rowSeats}</div>);
        }

        return theatreMapped;
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                Choose your seats (Max. 5)
            </div>
            <div className={styles.map}>
                <div className={styles.seatCount}>
                    <p>Selected {selected.length}</p>
                </div>
                {displaySeats()}
            </div>
        </div>
    );
}