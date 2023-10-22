import { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

function QuizSubmissionsComponent() {
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8090/api/quiz/submissions')
            .then(response => response.json())
            .then(data => setSubmissions(data))
            .catch(error => console.error('Error fetching submissions:', error));
    }, []);

    return (
        <div style={{ padding: '20px', width: '80%', margin: '0 auto' }}>
            <Typography variant="h4" style={{ marginBottom: '20px' }}>Quiz Submissions</Typography>

            <TableContainer component={Paper}>
                <Table aria-label="submissions table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User Name</TableCell>
                            <TableCell>Quiz Title</TableCell>
                            <TableCell>Score</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {submissions.map((submission, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">{submission.userName}</TableCell>
                                <TableCell>{submission.quizTitle}</TableCell>
                                <TableCell>{submission.score}</TableCell>
                                <TableCell>{submission.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default QuizSubmissionsComponent;
