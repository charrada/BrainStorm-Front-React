import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, Paper, Grid, Typography , Snackbar} from '@mui/material';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8090/api/v1/employee/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.status) {
                console.log("Login successful:", data);
                localStorage.setItem('user', JSON.stringify(data.employee));

                navigate('/quiz');
            } else {
                console.error("Login error:", data);
                setSnackbarMessage('Login failed!');
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error("There was an error during login:", error);
            setSnackbarMessage('Error during login!');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Paper style={{ padding: '16px', maxWidth: '500px', margin: 'auto' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h5">Login</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Login
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Link to="/register">Register</Link>
                </Grid>
            </Grid>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </Paper>
    );
}
