import { useEffect } from "react";
import { ArtCrime } from "../../types/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  item: ArtCrime | null;
}

const Modal: React.FC<Props> = ({ isOpen, onClose, item }) => {
  useEffect(() => {
    // Handle close on escape key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Listener & manage background scrolling
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = ""; // Restore background scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = ""; // Ensure cleanup on unmount
    };
  }, [isOpen, onClose]);

  return (
    <div role="presentation">
      <div role="dialog" aria-modal="true">
        <button onClick={onClose} aria-label="Close details">
          {" "}
          &times;{" "}
        </button>
        <h2>{item?.title}</h2>
        <p>Insert details here.</p>
      </div>
    </div>
  );
};

export default Modal;
