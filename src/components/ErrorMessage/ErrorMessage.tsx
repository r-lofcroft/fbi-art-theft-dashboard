import { ApiError } from "../../types/types";
import styles from "./ErrorMessage.module.css";

interface Props {
  error: ApiError | null;
}

const ErrorMessage: React.FC<Props> = ({ error }) => {
  if (!error) return null;

  return (
    <div className={styles.errorContainer} role="alert">
      <p>
        <strong>Error:</strong>
        {error.message}
      </p>
      {error.status && <p>Status Code: {error.status}</p>}
    </div>
  );
};

export default ErrorMessage;
