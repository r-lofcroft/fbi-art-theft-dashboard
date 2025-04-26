import styles from "./Pagination.module.css";

interface Props {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav className={styles.paginationNav}>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={styles.pageButton}
        aria-label="Go to previous page"
      >
        &laquo; Previous
      </button>
      <span aria-current="page" className={styles.pageInfo}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={styles.pageButton}
        aria-label="Go to next page"
      >
        Next &raquo;
      </button>
    </nav>
  );
};
export default Pagination;
