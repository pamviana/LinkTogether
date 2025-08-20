import { useState, useEffect } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { HelloHome } from "../Components/home/HelloHome";
import ClickableCard from "../Components/Card";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState<{ message?: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/calendar")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <Container maxWidth="sm">
      <Typography variant="h6">LinkTogether</Typography>
      <HelloHome />
      <Grid container spacing={2}>
        <Grid size={6}>
          <ClickableCard
            title="Calendar"
            subtitle="No events today"
            icon={<CalendarMonthIcon fontSize="large" />}
            onClick={() => navigate("/calendar")}
          />
        </Grid>
        <Grid size={6}>
          <ClickableCard
            title="Chores"
            subtitle="No chores today"
            icon={<CalendarMonthIcon fontSize="large" />}
            onClick={() => navigate("/chores")}
          />
        </Grid>
        <Grid size={6}>
          <ClickableCard
            title="Tasks"
            subtitle="No tasks today"
            icon={<CalendarMonthIcon fontSize="large" />}
            onClick={() => navigate("/tasks")}
          />
        </Grid>
        <Grid size={6}>
          <ClickableCard
            title="Baby Tracking"
            subtitle="How is baby doing?"
            icon={<ChildFriendlyIcon fontSize="large" />}
            onClick={() => navigate("/baby-tracking")}
          />
        </Grid>
        <Grid size={6}>
          <ClickableCard
            title="Lists"
            subtitle="0 lists"
            icon={<CalendarMonthIcon fontSize="large" />}
            onClick={() => navigate("/lists")}
          />
        </Grid>
        <Grid size={6}>
          <ClickableCard
            title="Workouts"
            subtitle="1 workout remaining"
            icon={<CalendarMonthIcon fontSize="large" />}
            onClick={() => navigate("/workout")}
          />
        </Grid>
        <Grid size={6}>
          <ClickableCard
            title="Meals"
            subtitle="What are we eating?"
            icon={<CalendarMonthIcon fontSize="large" />}
            onClick={() => navigate("/meals")}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
