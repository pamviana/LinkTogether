export interface Task {
  id?: string;
  title: string;
  recurrence: string;
  description?: string;
  createdTimestamp: Date;
  lastModified: Date;
  startDate?: Date | string;
  endDate?: Date | string;
  dueDate?: Date | string;
  dayOfWeek?: string;
  dayOfMonth?: number;
  createdBy: string;
  completed: boolean;
  assignedTo: string[];
  completedBy?: string;
  priority?: "HIGH" | "MEDIUM" | "LOW";
}

export const createTask = async (task: Task): Promise<void> => {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  const data = await response.json();
  return data.id;
};

export const completeTask = async (
  taskId: string,
  completed: boolean,
  user: string
): Promise<void> => {
  const response = await fetch(`/api/tasks/${taskId}/complete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed, user }),
  });

  if (!response.ok) {
    throw new Error(`Failed to ${completed ? "complete" : "incomplete"} task`);
  }
};

export const getTasksByAssignee = async (
  user: string,
  date: string
): Promise<Task[]> => {
  const response = await fetch(`/api/tasks/assigned`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user,
      date,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data = await response.json();
  return data.tasks as Task[];
};
