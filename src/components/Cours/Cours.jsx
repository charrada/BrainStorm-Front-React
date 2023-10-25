// src/components/Cours.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const Cours = () => {
  const [cours, setCours] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 4; // or any other number you prefer
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = cours.slice(indexOfFirstCourse, indexOfLastCourse);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8090/api/cours");
        setCours(response.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
    fetchData();
  }, []);
  const [images, setImages] = useState([]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Courses List</h2>
      <input
        type="text"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="row">
        {currentCourses
          .filter((c) =>
            c.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((c, i) => (
            <div key={c.id} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={"/img/image" + i + ".png"}
                  alt={c.title}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{c.title}</h5>
                  <p className="card-text">
                    {c.description.length > 100
                      ? c.description.substr(0, 97) + "..."
                      : c.description}
                  </p>
                  <a href={`/DetailCour/${c.id}`} className="btn btn-primary">
                    View Course
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(cours.length / coursesPerPage) },
          (_, index) => (
            <button key={index} onClick={() => setCurrentPage(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Cours;
