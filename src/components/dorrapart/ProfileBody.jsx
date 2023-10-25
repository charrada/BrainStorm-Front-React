import {
  Card,
  CardContent,
  Divider,
  Typography,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import background from "../../assets/bgBrain.png";

const ProfileBody = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      padding: "20px",
      backgroundImage: `url(${background})`, // Set the background image
      backgroundSize: "cover", // Adjust as needed
    }}
  >
    <Card
      style={{ width: "300px", backgroundColor: "rgba(255, 255, 255, 0.7)" }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Profile Information
        </Typography>

        <Divider style={{ marginBottom: "15px" }} />

        <Typography variant="body2" color="textSecondary" gutterBottom>
          Quiz Scores
        </Typography>

        <Typography variant="body1" gutterBottom>
          Full Name: John Doe
        </Typography>

        <Typography variant="body1" gutterBottom>
          Username: johndoe123
        </Typography>

        <Typography variant="body1" gutterBottom>
          Email: johndoe@example.com
        </Typography>

        <Typography variant="body1" gutterBottom>
          Gender: Male
        </Typography>

        <Typography variant="body1" gutterBottom>
          School Level: University
        </Typography>

        <Typography variant="body1" gutterBottom>
          Social:
          <IconButton color="primary">
            <FacebookIcon />
          </IconButton>
          <IconButton color="primary">
            <TwitterIcon />
          </IconButton>
          <IconButton color="primary">
            <InstagramIcon />
          </IconButton>
        </Typography>
      </CardContent>
    </Card>
  </div>
);

export default ProfileBody;
