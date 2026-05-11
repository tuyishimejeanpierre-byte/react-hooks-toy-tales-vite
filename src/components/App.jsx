import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);

  // ✅ ADD STATE FOR TOYS
  const [toys, setToys] = useState([]);
  function addToy(newToy) {
  setToys([...toys, newToy]);
}
function deleteToy(id) {
  fetch(`http://localhost:6001/toys/${id}`, {
    method: "DELETE",
  });

  setToys(toys.filter((toy) => toy.id !== id));
}

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // ✅ FETCH TOYS ON PAGE LOAD
  useEffect(() => {
    fetch("http://localhost:6001/toys")
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []);
  function updateLikes(toyObj) {
  fetch(`http://localhost:6001/toys/${toyObj.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      likes: toyObj.likes + 1,
    }),
  })
    .then((res) => res.json())
    .then((updatedToy) => {
      setToys(
        toys.map((toy) =>
          toy.id === updatedToy.id ? updatedToy : toy
        )
      );
    });
}

  return (
    <>
      <Header />

      {showForm && <ToyForm addToy={addToy} />}

      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>

      {/* ✅ PASS TOYS DOWN */}
     <ToyContainer toys={toys} deleteToy={deleteToy} updateLikes={updateLikes} />
    </>
  );
}

export default App;