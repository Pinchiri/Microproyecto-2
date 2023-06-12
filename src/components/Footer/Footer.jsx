import styles from './Footer.module.css';

export function Footer() {
    return (
      <div className={styles.footer}>
        <div className={styles.textContainer}>
          <div className={styles.other}> 0414-2222222</div>
          <div className={styles.names}>
            <p>Rolando Sorrentino</p>
            <p>Tomás Gil</p>
          </div>
          <div className={styles.other}>Universidad Metropolitana</div>
        </div>
      </div>
    );
  }
  