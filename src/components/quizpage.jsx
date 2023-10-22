import  { useState } from 'react';
import { Button, Paper, Typography, Dialog, DialogActions, DialogContent} from '@mui/material';
import AddQuiz from '../components/AddQuiz.jsx'; // Ensure the correct path
import QuizTaker from '../components/QuizTaker.jsx'; // Ensure the correct path
import QuizList from '../components/Allquizes.jsx';
import {  useNavigate } from 'react-router-dom';// Ensure the correct path
import MenuIcons from './MenuIcons.jsx';  // Import MenuIcons


// Import the background image from your assets
import background from '../assets/background.jpg';

const Quiz = () => {
    const userEmail = JSON.parse(localStorage.getItem('user')).email;
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [quizzes, setQuizzes] = useState([]); // Assuming quizzes is a stateful array
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [role, setRole] = useState(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user ? user.role : null;
    });
    const handleOpen = () => {
        setOpen(true);
    };
    const navigateToSubmissions = () => {
        navigate('/subs');
    };
    const handleClose = () => {
        setOpen(false);
        setSelectedQuiz(null);
    };

    const handleAddQuiz = () => {
        handleOpen();
    };

    const handleSubmitSuccess = (newQuiz) => {
        alert('Quiz and question created successfully!');
        setQuizzes([...quizzes, newQuiz]); // Add the new quiz to the quizzes array
        handleClose();
    };

    return (
        <div
            style={{
                backgroundImage: `url(${background})`, // Set the background image
                backgroundSize: 'cover', // Adjust the background size as needed
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh', // Ensure the background covers the entire viewport
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <MenuIcons />
            {selectedQuiz ? (
                <QuizTaker
                    quiz={selectedQuiz}
                    onFinish={(finalScore) => {
                        alert(`Your score is: ${finalScore}%`);
                        setSelectedQuiz(null);
                    }}
                />
            ) : (
                <>
                    <Paper elevation={3} style={{
                        padding: '30px',
                        maxWidth: '200px',
                        margin: '25px auto 700px',
                        backgroundColor: ' #333333', // Set the background color to purple
                        borderRadius: '15px', // Adjust the border radius for shape
                        textAlign: 'center', // Center align text
                    }}>
                        <Typography variant="h4" style={{ color: 'greenyellow' }}>Quiz</Typography>
                        {role === 'professor' && (
                            <div>
                                <Button variant="contained" color="secondary" onClick={handleAddQuiz}>Add Quiz</Button>
                                <br/>
                                <Button variant="contained" color="primary" onClick={navigateToSubmissions}>See Submissions</Button>
                            </div>
                        )}
                    </Paper>

                    <QuizList onSelectQuiz={setSelectedQuiz} userEmail={userEmail} />

                    <Dialog open={open} onClose={handleClose}>
                        <DialogContent>
                            <AddQuiz onSubmit={handleSubmitSuccess} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">Cancel</Button>
                        </DialogActions>
                    </Dialog>
                </>
            )}
        </div>
    );
};

export default Quiz;
