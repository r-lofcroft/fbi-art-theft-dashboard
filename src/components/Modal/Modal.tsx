import { useEffect } from "react";
import { ArtCrime } from "../../types/types";
import styles from "./Modal.module.css";

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

  if (!isOpen || !item) {
    return null;
  }

  return (
    <div role="presentation" className={styles.overlay}>
      <div role="dialog" aria-modal="true" className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close details"
        >
          {" "}
          &times;{" "}
        </button>
        <h2 className={styles.title}>{item?.title}</h2>
        {item?.description && (
          <div className={styles.content}>
            <div className={styles.section}>
              <strong>Description:</strong>
              <p>{item?.description}</p>
            </div>
          </div>
        )}
        {item?.maker && (
          <div className={styles.content}>
            <div className={styles.section}>
              <strong>Maker:</strong>
              <p>{item?.maker}</p>
            </div>
          </div>
        )}
        {item?.period && (
          <div className={styles.content}>
            <div className={styles.section}>
              <strong>Period:</strong>
              <p>{item?.period}</p>
            </div>
          </div>
        )}
        {item?.images && item?.images.length > 0 && (
          <div className={styles.content}>
            <div className={styles.section}>
              <strong>Images:</strong>
              <div>
                {item.images.map((img, index) => (
                  <a
                    key={index}
                    href={img.original}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={img.caption || "View large image"}
                  >
                    <img
                      src={img.large}
                      alt={
                        img.caption || `Image ${index + 1} for ${item.title}`
                      }
                      loading="lazy"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
