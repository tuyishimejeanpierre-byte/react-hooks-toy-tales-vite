import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);

  // ✅ ADD STATE FOR TOYS
  const [toys, setToys] = useState([]);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // ✅ FETCH TOYS ON PAGE LOAD
  useEffect(() => {
    fetch("http://localhost:6001/toys")
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []);

  return (
    <>
      <Header />

      {showForm ? <ToyForm /> : null}

      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>

      {/* ✅ PASS TOYS DOWN */}
      <ToyContainer toys={toys} />
    </>
  );
}

export default App;