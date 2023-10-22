import { IconButton, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NotificationBell = () => {
    return (
        <div>
            <IconButton size="small" style={{ color: 'white' }}>
                <Badge badgeContent={0} color="primary">
                    <NotificationsIcon style={{ color: 'green' }} />
                </Badge>
            </IconButton>
        </div>
    );
};

export default NotificationBell;
