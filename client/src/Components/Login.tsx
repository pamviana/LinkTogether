import React, { useState } from "react";
import {
  TextField,
  Typography,
  Paper,
  Box,
  Button,
  Drawer,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../utils/userUtils";
import { SignupForm } from "./SignupForm";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openSignupDrawer, setOpenSignupDrawer] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await checkLogin(username, password);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid username or password");
      return;
    }
  };

  return (
    <Paper>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          required
          label="Username"
          margin="normal"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          required
          label="Password"
          type="password"
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{ width: "40%", alignSelf: "center" }}
        >
          LOGIN
        </Button>
      </Box>
      <Button onClick={() => setOpenSignupDrawer(true)}>Sign Up</Button>
      <Drawer
        open={openSignupDrawer}
        onClose={() => setOpenSignupDrawer(false)}
      >
        <SignupForm setOpenSignupDrawer={setOpenSignupDrawer} />
      </Drawer>
    </Paper>
  );
}
