import { authenticateUser } from "../api/user";
import { useUserStore } from "../store/useUserStore";
import type { User } from "../api/user";

export const checkLogin = async (
  username: string,
  password: string
): Promise<void> => {
  try {
    const user = (await authenticateUser(username, password)) as User | null;
    if (user) {
      useUserStore.getState().setUser({
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        group: user.group,
        permissions: user.permissions,
      });

      return;
    }
    throw new Error("Invalid username or password");
  } catch (error) {
    throw new Error(`Login failed: ${error}`);
  }
};
