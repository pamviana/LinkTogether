import React from "react";
import { Typography } from "@mui/material";

export default function Lists() {
  const [test, setTest] = React.useState("");

  React.useEffect(() => {
    setTest("Hello");
  }, []);

  return (
    <>
      <Typography variant="h5">Lists</Typography>
    </>
  );
}