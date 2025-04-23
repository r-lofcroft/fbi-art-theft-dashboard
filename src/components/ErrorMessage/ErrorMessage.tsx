import { ApiError } from "../../types/types";

interface Props {
  error: ApiError | null;
}

const ErrorMessage: React.FC<Props> = ({ error }) => {
  if (!error) return null;

  return (
    <div role="alert">
      <p>
        <strong>Error:</strong>
        {error.message}
      </p>
      {error.status && <p>Status Code: {error.status}</p>}
    </div>
  );
};

export default ErrorMessage;
