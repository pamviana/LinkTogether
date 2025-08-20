import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, IconButton, Typography } from "@mui/material";
import { DateTime } from "luxon";
import { useDateStore } from "../store/useDateStore";

export function DateNavigator() {
  const { selectedDate, nextDay, prevDay } = useDateStore();

  const getDisplayDate = () => {
    if (selectedDate.hasSame(DateTime.local(), "day")) {
      return "Today";
    } else if (
      selectedDate.hasSame(DateTime.local().plus({ days: 1 }), "day")
    ) {
      return "Tomorrow";
    } else if (
      selectedDate.hasSame(DateTime.local().minus({ days: 1 }), "day")
    ) {
      return "Yesterday";
    } else {
      return selectedDate.toFormat("ccc, LLL dd");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 1,
      }}
    >
      <IconButton onClick={prevDay}>
        <ArrowBackIosIcon />
      </IconButton>
      <Typography variant="h6">{getDisplayDate()}</Typography>
      <IconButton onClick={nextDay}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
}
