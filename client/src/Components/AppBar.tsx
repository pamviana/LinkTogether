import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Box,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import { useUserStore } from "../store/useUserStore";

export default function MyAppBar() {
  const [test, setTest] = React.useState("");
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  console.log("User in AppBar:", user);
  const handleBack = () => {
    navigate(-1);
  };

  const showBackButton = location.pathname !== "/";
  const showMenu = location.pathname === "/";
  const showNotificationIcon = location.pathname === "/";

  if (location.pathname === "/login") {
    return null;
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Box>
          {showMenu && (
            <IconButton>
              <MenuIcon />
            </IconButton>
          )}
          {showBackButton && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="back"
              onClick={handleBack}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
          )}
          <IconButton
            color="inherit"
            // onClick={() => setDrawerOpen(true)}
            aria-label="switch user"
          >
            <Typography variant="h6" sx={{ ml: 1 }}>
              {user.name}
            </Typography>
            <ExpandMoreIcon />
          </IconButton>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={2} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
