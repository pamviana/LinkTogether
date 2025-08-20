import { Box, Paper, Typography, useScrollTrigger } from "@mui/material";
import { DateTime } from "luxon";
import { useUserStore } from "../../store/useUserStore";

export function HelloHome() {
  const now = DateTime.local();
  const user = useUserStore((state) => state.user);

  return (
    <Paper>
      <Box>
        <Typography variant="h6">{now.toFormat("EEEE, LLLL d")}</Typography>
        <Typography variant="body1">Hello, {user?.name}</Typography>
        <Typography variant="body1">Upcoming events today:</Typography>
        <Box>
          <Box>
            <Typography variant="body1">Pediatrician</Typography>
            <Typography variant="body2">1:30 PM - 2:30 PM</Typography>
          </Box>
          <Box>
            <Typography variant="body1">Test Event</Typography>
            <Typography variant="body2">3:30 PM - 7:30 PM</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
