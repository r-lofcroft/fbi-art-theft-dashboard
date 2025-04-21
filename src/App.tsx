import { useEffect } from "react";

import "./App.css";
import { useArtCrimeApi } from "./hooks/useApi";

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
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
