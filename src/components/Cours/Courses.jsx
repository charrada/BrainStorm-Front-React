import React, { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

function Courses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch('/api/courses')
            .then(response => response.json())
            .then(data => setCourses(data));
    }, []);

    return (
        <div>
            <h2>Courses</h2>
            <ListGroup>
                {courses.map(course => (
                    <ListGroupItem key={course.id}>
                        <strong>{course.name}</strong> - {course.description}
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>
    );
}

export default Courses;