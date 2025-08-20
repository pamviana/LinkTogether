import db from "../db/firestore.js";
import { getDatesInRange } from "../utils/dateTimeUtils.js";

export interface Task {
  id?: string;
  title: string;
  recurrence: string;
  description?: string;
  createdTimestamp: Date;
  lastModified: Date;
  startDate?: Date | null;
  endDate?: Date | null;
  dueDate?: Date;
  dayOfWeek?: string;
  dayOfMonth?: number;
  createdBy: string;
  completed: boolean;
  assignedTo: string[];
  completedBy?: string;
  priority?: "HIGH" | "MEDIUM" | "LOW";
}

export const createTask = async (task: Task): Promise<string[]> => {
  const tasks = getTasksToCreate(task);
  const taskPromises = tasks.map((task) => {
    return db
      .collection("tasks")
      .add({
        ...task,
      });
  });
  const taskRefs = await Promise.all(taskPromises);
  const taskIds = taskRefs.map((ref) => ref.id);
  return taskIds;
};

const getTasksToCreate = (task: Task): Task[] => {
  if (task.recurrence === "None") {
    return [{ ...task, startDate: null, endDate: null }];
  } else {
    if (!task.startDate || !task.endDate) {
      throw new Error("Start and end dates are required for recurring tasks");
    }
    const tasks: Task[] = [];
    const dates = getDatesInRange(
      task.startDate,
      task.endDate,
      task.recurrence,
      task.dayOfWeek,
      task.dayOfMonth
    );

    dates.forEach((date) => {
      tasks.push({
        ...task,
        startDate: task.startDate ? new Date(task.startDate) : null,
        endDate: task.endDate ? new Date(task.endDate) : null,
        dueDate: date,
      });
    });

    return tasks;
  }
};

export const getTasksByAssignee = async (
  user: string,
  date: string
): Promise<Task[]> => {
  const snapshot = await db
    .collection("tasks")
    .where("assignedTo", "array-contains", user)
    .where("dueDate", "==", new Date(date))
    .get();

  if (snapshot.empty) {
    return [];
  }

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Task[];
};

export const completeTask = async (
  taskId: string,
  completed: boolean,
  user: string
): Promise<void> => {
  const taskRef = db.collection("tasks").doc(taskId);
  await taskRef.update({
    completed,
    lastModified: new Date(),
    completedBy: user,
  });
};
