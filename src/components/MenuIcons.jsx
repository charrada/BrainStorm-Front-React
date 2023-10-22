import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

import NotificationBell from "./notification.jsx";

const MenuIcons = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="static" style={{ backgroundColor: 'rgb(51, 51, 51)' }}>
            <Toolbar>
                <Typography variant="h5" style={{ flexGrow: 1, color: 'lightgreen' }}>
                    Brain Storm
                </Typography>
                <Box display="flex" alignItems="center">
                    <NotificationBell/>
                </Box>
                <button onClick={() => navigate("/")}>Log out</button>
            </Toolbar>
        </AppBar>
    );
};

export default MenuIcons;
