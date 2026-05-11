import React, { useState } from "react";
function ToyForm({ addToy }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
  e.preventDefault();

  const newToy = {
    name: formData.name,
    image: formData.image,
    likes: 0,
  };

  fetch("http://localhost:6001/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newToy),
  })
    .then((res) => res.json())
    .then((data) => {
      addToy(data); // ✅ THIS is correct
    });

  setFormData({
    name: "",
    image: "",
  });
}
  return (
    <form onSubmit={handleSubmit}>
      <input
  name="name"
  placeholder="Enter a toy's name..."
  value={formData.name}
  onChange={handleChange}
/>

<input
  name="image"
  placeholder="Enter a toy's image URL..."
  value={formData.image}
  onChange={handleChange}
/>
      <button type="submit">Create New Toy</button>
    </form>
  );
}
export default ToyForm;