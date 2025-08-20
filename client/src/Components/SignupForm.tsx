import { ArrowBack } from "@mui/icons-material";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { createUser } from "../api/user";

export function SignupForm({
  setOpenSignupDrawer,
}: {
  setOpenSignupDrawer: (open: boolean) => void;
}) {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
    group: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUser(userData);
      setOpenSignupDrawer(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        margin: "10px 30px",
        marginBottom: "50px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "calc(100vw - 60px)",
      }}
      component="form"
      onSubmit={(e) => handleCreateUser(e)}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton onClick={() => setOpenSignupDrawer(false)}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" sx={{ padding: 2, alignSelf: "center" }}>
          Sign up
        </Typography>
      </Box>

      <TextField
        required
        id="username"
        label="Username"
        name="username"
        value={userData.username}
        onChange={handleChange}
      />
      <TextField
        required
        id="name"
        label="Name"
        name="name"
        value={userData.name}
        onChange={handleChange}
      />
      <TextField
        required
        id="email"
        label="Email"
        name="email"
        value={userData.email}
        onChange={handleChange}
        type="email"
      />
      <TextField
        required
        id="password"
        label="Password"
        name="password"
        value={userData.password}
        onChange={handleChange}
        type="password"
      />
      <TextField
        required
        id="group"
        label="Group"
        name="group"
        value={userData.group}
        onChange={handleChange}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ marginTop: "20px", width: "40%", alignSelf: "center" }}
      >
        Sign up
      </Button>
    </Box>
  );
}
