import { useState } from "react";

// MUI components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function PlatformSettings() {
  const [followsMe, setFollowsMe] = useState(true);
  const [answersPost, setAnswersPost] = useState(false);
  const [mentionsMe, setMentionsMe] = useState(true);

  return (
    <Card sx={{ boxShadow: "none" }}>
      <Box p={2}>
        <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
          platform settings
        </Typography>
      </Box>
      <Box pt={1} pb={2} px={2} lineHeight={1.25}>
        <Typography
          variant="caption"
          fontWeight="bold"
          color="text"
          textTransform="uppercase"
        >
          account
        </Typography>
        <Box display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <Box mt={0.5}>
            <Switch
              checked={followsMe}
              onChange={() => setFollowsMe(!followsMe)}
            />
          </Box>
          <Box width="80%" ml={0.5}>
            <Typography variant="button" fontWeight="regular" color="text">
              Notify me when a new quiz is uploaded
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <Box mt={0.5}>
            <Switch
              checked={answersPost}
              onChange={() => setAnswersPost(!answersPost)}
            />
          </Box>
          <Box width="80%" ml={0.5}>
            <Typography variant="button" fontWeight="regular" color="text">
              Notify me when a new course is uploaded
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <Box mt={0.5}>
            <Switch
              checked={mentionsMe}
              onChange={() => setMentionsMe(!mentionsMe)}
            />
          </Box>
          <Box width="80%" ml={0.5}>
            <Typography variant="button" fontWeight="regular" color="text">
              Email me when someone mentions me
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default PlatformSettings;
