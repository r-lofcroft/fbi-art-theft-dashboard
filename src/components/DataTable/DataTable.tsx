const DataTable: React.FC<any> = ({ items }) => {
  console.log("debug", items);

  if (!items || items.length === 0) {
    return <p>No data found.</p>;
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item: any) => {
            return (
              <tr key={item.uid}>
                <td>
                  {item.images && item.images.length > 0 ? (
                    <img
                      src={item.images[0].thumb}
                      alt={`Thumbnail for ${item.title}`}
                      loading="lazy"
                    />
                  ) : (
                    <span>No Image</span>
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
