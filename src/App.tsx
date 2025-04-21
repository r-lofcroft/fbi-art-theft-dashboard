import { useEffect } from "react";

import "./App.css";
import { useArtCrimeApi } from "./hooks/useApi";
import DataTable from "./components/DataTable/DataTable";

const PAGE_SIZE = 20;

function App() {
  const { items, fetchData } = useArtCrimeApi({ pageSize: PAGE_SIZE });

  //Debug to check items
  useEffect(() => {
    console.log("Current items:", items);
  }, [items]);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => fetchData()}></button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <main>
        <DataTable items={items} />
      </main>
    </>
  );
}

export default App;
