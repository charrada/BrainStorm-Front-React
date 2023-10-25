// src/components/DetailCour.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailCour = () => {
    const [cour, setCour] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8090/api/cours/${id}`);
                setCour(response.data);
            } catch (err) {
                console.error("Error fetching course details:", err);
            }
        };
        fetchData();
    }, [id]);

    if (!cour) return <div>Loading...</div>;

    return (
        <div className="container mt-5">
            <h2>{cour.title}</h2>
            <p>{cour.description}</p>
            <p>Duration: {cour.duree} hours</p>
        </div>
    );
}

export default DetailCour;
