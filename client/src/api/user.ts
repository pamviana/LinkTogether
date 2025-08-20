export interface User {
  id?: string;
  username: string;
  password: string;
  email: string;
  permissions?: string[];
  name: string;
  group: string;
}

export const authenticateUser = async (
  username: string,
  password: string
): Promise<User | null> => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const data = await response.json();
    return data.user as User;
  }

  return null;
};

export const createUser = async (user: User): Promise<void> => {
  const response = await fetch("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create user");
  }
};
