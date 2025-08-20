import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import Login from "./Components/Login";
import Home from "./Containers/Home";
import Workout from "./Containers/Workout";
import BabyTracking from "./Containers/BabyTracking";
import Calendar from "./Containers/Calendar";
import Chores from "./Containers/Chores";
import Lists from "./Containers/Lists";
import Meals from "./Containers/Meals";
import Tasks from "./Containers/Tasks";
import MyAppBar from "./Components/AppBar";
import "./App.css";
import { Box } from "@mui/material";

function App() {
  return (
    <Router>
      <Box
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <MyAppBar />
        <Box sx={{ flex: 1 }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/baby-tracking" element={<BabyTracking />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/chores" element={<Chores />} />
            <Route path="/lists" element={<Lists />} />
            <Route path="/meals" element={<Meals />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route
              path="/workout"
              element={
                <ProtectedRoute>
                  <Workout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
