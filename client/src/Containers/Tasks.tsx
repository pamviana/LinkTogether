import React from "react";
import { Box, Typography, Fab, Drawer, Button } from "@mui/material";
import { TaskCard } from "../Components/TaskCard";
import AddIcon from "@mui/icons-material/Add";
import { TaskForm } from "../Components/TaskForm";
import { getTasksByAssignee, completeTask } from "../api/tasks";
import type { Task } from "../api/tasks";
import { useDateStore } from "../store/useDateStore";
import { DateNavigator } from "../Components/DateNavigator";
import { DateTime } from "luxon";
import { AnimatePresence } from "framer-motion";
import { useUserStore } from "../store/useUserStore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Tasks() {
  const user = useUserStore((state) => state.user);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openTaskDrawer, setOpenTaskDrawer] = React.useState(false);
  const [taskId, setTaskId] = React.useState<string>("");
  const [incompleteTasks, setIncompleteTasks] = React.useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = React.useState<Task[]>([]);
  const { selectedDate } = useDateStore();

  React.useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getTasksByAssignee(
          user.name,
          selectedDate.toFormat("MM/dd/yyyy") ??
            DateTime.local().toFormat("MM/dd/yyyy")
        );
        const incomplete = tasks?.filter((task) => !task.completed);
        setIncompleteTasks(incomplete);

        const completed = tasks?.filter((task) => task.completed);
        setCompletedTasks(completed);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setIncompleteTasks([]);
        setCompletedTasks([]);
      }
    };

    fetchTasks();
  }, [user, selectedDate]);

  const handleTaskCompletion = async (taskId: string, completed: boolean) => {
    try {
      await completeTask(taskId, completed, user.username);
      if (completed) {
        setIncompleteTasks((prev) => prev.filter((task) => task.id !== taskId));
        setCompletedTasks((prev) => {
          const completedTask = incompleteTasks.find(
            (task) => task.id === taskId
          );
          return completedTask
            ? [...prev, { ...completedTask, completed: true }]
            : prev;
        });
      } else {
        setCompletedTasks((prev) => prev.filter((task) => task.id !== taskId));
        setIncompleteTasks((prev) => {
          const incompletedTask = completedTasks.find(
            (task) => task.id === taskId
          );
          return incompletedTask
            ? [...prev, { ...incompletedTask, completed: false }]
            : prev;
        });
      }
    } catch (error) {
      console.error("Error completing task:", error);
      // Optionally, you could show an error message to the user here
    }
  };

  const handleTaskPlusClick = async () => {
    setOpenDrawer(true);
  };

  return (
    <Box className="main-body">
      <DateNavigator />
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Typography variant="h6">Incomplete Tasks</Typography>
        <Typography variant="body2">see all</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          margin: "1em",
        }}
      >
        <AnimatePresence>
          {incompleteTasks.length === 0 && (
            <Typography variant="body2">There are no tasks</Typography>
          )}
          {incompleteTasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              priority={task.priority || "MEDIUM"}
              onChange={() => handleTaskCompletion(task.id || "", true)}
              completed={task.completed}
              id={task.id || ""}
              setTaskId={setTaskId}
              setOpenTaskDrawer={setOpenTaskDrawer}
            />
          ))}
        </AnimatePresence>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Typography variant="h6">Completed</Typography>
        <Typography variant="body2">see all</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          margin: "1em",
        }}
      >
        <AnimatePresence>
          {completedTasks.length === 0 && (
            <Typography variant="body2">No completed tasks</Typography>
          )}
          {completedTasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              priority={task.priority || "MEDIUM"}
              onChange={() => handleTaskCompletion(task.id || "", false)}
              completed={true}
              completedBy={task.completedBy}
              lastModified={task.lastModified}
              id={task.id || ""}
              setTaskId={setTaskId}
              setOpenTaskDrawer={setOpenTaskDrawer}
            />
          ))}
        </AnimatePresence>
      </Box>
      <Fab
        size="large"
        color="secondary"
        aria-label="add"
        onClick={handleTaskPlusClick}
        sx={{ position: "fixed", bottom: 30, right: 30, zIndex: 1000 }}
      >
        <AddIcon />
      </Fab>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        anchor="bottom"
      >
        <TaskForm />
      </Drawer>
      <Drawer
        anchor="bottom"
        open={openTaskDrawer}
        onClose={() => setOpenTaskDrawer(false)}
      >
        <Box sx={{ margin: "30px" }}>
          <Button
            onClick={() => console.log("task deleted ", taskId)}
            sx={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <DeleteIcon />
            <Typography variant="body1" sx={{ textTransform: "none" }}>
              Delete task
            </Typography>
          </Button>
          <Button
            onClick={() => console.log("task edited ", taskId)}
            sx={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <EditIcon />
            <Typography variant="body1" sx={{ textTransform: "none" }}>
              Edit task
            </Typography>
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}
