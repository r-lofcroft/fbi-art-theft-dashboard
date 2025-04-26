import styles from "./LoadingSpinner.module.css";

const LoadingSpinner: React.FC = () => (
  <div className={styles.spinnerContainer} aria-live="polite">
    <div className={styles.spinner}></div>
    <span>Loading...</span>
  </div>
);
export default LoadingSpinner;
