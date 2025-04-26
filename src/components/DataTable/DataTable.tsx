import { ArtCrime } from "../../types/types";
import styles from "./DataTable.module.css";

interface Props {
  items: ArtCrime[];
  onRowClick: (item: ArtCrime) => void;
}

const DataTable: React.FC<Props> = ({ items, onRowClick }) => {
  console.log("debug", items);

  if (!items || items.length === 0) {
    return <p>No data found.</p>;
  }
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {items.map((item: any) => {
            return (
              <tr
                key={item.uid}
                className={styles.tableRow}
                onClick={() => onRowClick(item)}
                tabIndex={0}
                aria-label={`View details for ${item.details}`}
              >
                <td>
                  {item.images && item.images.length > 0 ? (
                    <img
                      src={item.images[0].thumb}
                      alt={`Thumbnail for ${item.title}`}
                      loading="lazy"
                      className={styles.thumbnail}
                    />
                  ) : (
                    <span className={styles.noImage}>No Image</span>
                  )}
                </td>
                <td>{item.title || "N/A"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
