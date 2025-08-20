import React from "react";
import { Typography } from "@mui/material";

export default function Chores() {
  const [test, setTest] = React.useState("");

  React.useEffect(() => {
    setTest("Hello");
  }, []);

  return (
    <>
      <Typography variant="h5">Chores</Typography>
    </>
  );
}