import express from "express";
import {
  createTask,
  completeTask,
  getTasksByAssignee,
  Task,
} from "../services/tasksService.js";

const router = express.Router();

router.post("/tasks", async (req, res) => {
  try {
    const task: Task = req.body;

    if (!task.title) {
      return res.status(400).json({ error: "Task title is required" });
    }

    const newTasks = await createTask(task);
    res.status(201).json(newTasks);
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/tasks/assigned", async (req, res) => {
  const { user, date } = req.body as { user?: string; date?: string };

  if (!date) {
    return res.status(400).json({ error: "Date is required" });
  }
  if (!user) {
    return res.status(400).json({ error: "User is required" });
  }

  try {
    const tasks = await getTasksByAssignee(user, date);
    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/tasks/:taskId/complete", async (req, res) => {
  const { taskId } = req.params;
  const { completed, user } = req.body;

  if (!taskId) {
    return res.status(400).json({ error: "Task ID is required" });
  }
  if (typeof completed !== "boolean") {
    return res.status(400).json({ error: "Completed status (boolean) is required" });
  }
  if (!user) {
    return res.status(400).json({ error: "User who completed the task is required" });
  }

  try {
    await completeTask(taskId, completed, user);
    res.status(200).json({ message: `Task marked as ${completed ? "completed" : "incomplete"} by ${user}` });
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
