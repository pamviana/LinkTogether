import db from "../db/firestore.js";

export interface Task {
  title: string;
  recurrence: string;
  description?: string;
  createdTimestamp: Date;
  lastModified: Date;
  startDate?: Date;
  endDate?: Date;
  dueDate?: Date;
  user: string;
  completed: boolean;
}

export const addTask = async (task: Task): Promise<string> => {
  const docRef = await db.collection("tasks").add({
    ...task,
  });

  return docRef.id;
};
