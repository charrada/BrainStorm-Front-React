import Navbar from "./Navbar";
import ProfileBody from "./ProfileBody";
import PlatformSettings from "./PlatformSettings";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Courses from "./courses";
const ProfilePage = () => (
  <div>
    <Navbar />
    <Card variant="outlined" sx={{ margin: "2em", padding: "2em" }}>
      <Box>
        <ProfileBody />
      </Box>
      <Box mt={3}>
        <PlatformSettings />
      </Box>
    </Card>
    <Courses />
  </div>
);

export default ProfilePage;
