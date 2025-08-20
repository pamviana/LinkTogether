import React from "react";
import { Typography } from "@mui/material";

export default function Calendar() {
  const [test, setTest] = React.useState("");

  React.useEffect(() => {
    setTest("Hello");
  }, []);

  return (
    <>
      <Typography variant="h5">Calendar</Typography>
    </>
  );
}
