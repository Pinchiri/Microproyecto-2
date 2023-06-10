import styles from './Footer.module.css';

export function Footer() {
    return (
      <div className={styles.footer}>
        <div className={styles.textContainer}>
          <div> 0414-2222222</div>
          <div>ejemplo@unimet.edu.ve</div>
          <div>Universidad Metropolitana</div>
        </div>
      </div>
    );
  }
  