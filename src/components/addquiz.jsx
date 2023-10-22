import { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Radio, RadioGroup, FormControlLabel, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';

const AddQuiz = ({ onSubmit }) => {
    const [quizTitle, setQuizTitle] = useState('');
    const [assignedToEmails, setAssignedToEmails] = useState('')
    const [questions, setQuestions] = useState([{
        questionTitle: '',
        options: ['', '', '', ''],
        correctOption: '',
        difficultyLevel: '',
        category: '',
    }]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
// Before the Quiz Title TextField...
    const [durationInMinutes, setDurationInMinutes] = useState('');

    const addQuestion = () => {
        setQuestions([...questions, {
            questionTitle: '',
            options: ['', '', '', ''],
            correctOption: '',
            difficultyLevel: '',
            category: '',
        }]);
        setCurrentQuestionIndex(questions.length);  // Navigate to the new question
    }

    const handleQuestionChange = (key, value) => {
        const newQuestions = [...questions];
        newQuestions[currentQuestionIndex][key] = value;
        setQuestions(newQuestions);
    }

    const handleSubmit = async () => {
        try {
            // Create the quiz as before
            const quizResponse = await axios.post('http://localhost:8090/api/quizzes', { title: quizTitle , durationInMinutes});
            const quiz = quizResponse.data;
            if (!quiz.id) {
                alert('Quiz not found or created successfully.');
                return;
            }
            const addedQuestions = [];
            for (let question of questions) {
                const { options, ...rest } = question;

                const transformedQuestion = {
                    ...rest,
                    option1: options[0],
                    option2: options[1],
                    option3: options[2],
                    option4: options[3],
                    correctOption: parseInt(rest.correctOption)  // Convert string to int
                };

                const { data: addedQuestion } = await axios.post(`http://localhost:8090/api/questions?quizId=${quiz.id}`, transformedQuestion);
                addedQuestions.push(addedQuestion);
            }

            const newQuiz = {
                ...quiz,
                questions: addedQuestions
            };

            // Assign the quiz to specified users
            await axios.post(`http://localhost:8090/api/v1/employee/assignQuiz/${quiz.id}`,  assignedToEmails.split(',') );

            onSubmit(newQuiz);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) { //
                alert(`Error: ${error.response.data.message}`);// those line helped me identify the error with getting specfied error
            } else {
                alert('Error creating quiz or assigning questions.');
            }
            console.error('There was an error:', error);
        }
    };



    const question = questions[currentQuestionIndex];

    return (
        <div>
            <Typography variant="h5">Add New Quiz</Typography>
            <TextField fullWidth margin="normal" label="Quiz Title" value={quizTitle} onChange={e => setQuizTitle(e.target.value)} />
            <TextField fullWidth margin="normal" label="Duration in Minutes" value={durationInMinutes} onChange={e => setDurationInMinutes(e.target.value)} />

            <Typography variant="h6">Question {currentQuestionIndex + 1}</Typography>
            <TextField fullWidth margin="normal" label="Question Title" value={question.questionTitle} onChange={e => handleQuestionChange('questionTitle', e.target.value)} />

            {question.options.map((option, oIndex) => (
                <TextField
                    key={oIndex}
                    fullWidth
                    margin="normal"
                    label={`Option ${oIndex + 1}`}
                    value={option}
                    onChange={e => {
                        const newOptions = [...question.options];
                        newOptions[oIndex] = e.target.value;
                        handleQuestionChange('options', newOptions);
                    }}
                />
            ))}
            <h2> The correct answer</h2>
            <RadioGroup row value={question.correctOption} onChange={e => handleQuestionChange('correctOption', e.target.value)}>
                {['1', '2', '3', '4'].map((value) => (
                    <FormControlLabel key={value} value={value} control={<Radio />} label={`Option ${value}`} />
                ))}
            </RadioGroup>

            <FormControl fullWidth margin="normal">
                <InputLabel>Difficulty Level</InputLabel>
                <Select value={question.difficultyLevel} onChange={e => handleQuestionChange('difficultyLevel', e.target.value)}>
                    <MenuItem value={'Easy'}>Easy</MenuItem>
                    <MenuItem value={'Medium'}>Medium</MenuItem>
                    <MenuItem value={'Hard'}>Hard</MenuItem>
                </Select>
            </FormControl>

            <TextField fullWidth margin="normal" label="Category" value={question.category} onChange={e => handleQuestionChange('category', e.target.value)} />

            {currentQuestionIndex > 0 && (
                <Button variant="contained" color="secondary" onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>
                    Previous Question
                </Button>
            )}
            <TextField fullWidth margin="normal" label="Assigned To (Comma-separated emails)" value={assignedToEmails} onChange={e => setAssignedToEmails(e.target.value)} />

            {currentQuestionIndex < questions.length - 1 && (
                <Button variant="contained" color="secondary" onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>
                    Next Question
                </Button>
            )}
            <Button variant="contained" color="secondary" onClick={addQuestion}>
                Add Question
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit Quiz
            </Button>

        </div>
    );
};

AddQuiz.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default AddQuiz;
