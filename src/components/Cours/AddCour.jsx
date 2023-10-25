// src/components/AddCour.js

import React, { useState } from "react";
import axios from "axios";

const AddCour = () => {
  const [cour, setCour] = useState({
    title: "taha",
    description: "tahatouu",
    duree: 22,
    image: null,
    pdfFile: null,
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const bytes = new Uint8Array(e.target.result);
        setCour({ ...cour, image: Array.from(Object.values(bytes)) });
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handlePdfChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const bytes = new Uint8Array(e.target.result);
        setCour({ ...cour, pdfFile: Array.from(Object.values(bytes)) });
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(cour);

    try {
      const response = await axios.post(
        "http://localhost:8090/api/cours",
        cour
      );
      console.log("Course added:", response.data);
    } catch (err) {
      console.error("Error adding course:", err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={cour.title}
            onChange={(e) => setCour({ ...cour, title: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={cour.description}
            onChange={(e) => setCour({ ...cour, description: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Duration</label>
          <input
            type="number"
            name="duree"
            className="form-control"
            value={cour.duree}
            onChange={(e) => setCour({ ...cour, duree: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Course Image</label>
          <input
            name="image"
            type="file"
            className="form-control"
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">PDF File</label>
          <input
            name="pdfFile"
            type="file"
            className="form-control"
            onChange={handlePdfChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCour;
