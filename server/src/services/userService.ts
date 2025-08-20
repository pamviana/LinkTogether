import db from "../db/firestore.js";
import bcrypt from "bcryptjs";

interface CreateUserParams {
  username: string;
  password: string;
  email: string;
  name: string;
  group: string;
}

export const createUser = async (user: CreateUserParams) => {
  const passwordHash = await bcrypt.hash(user.password, 10);

  const userDoc = {
    username: user.username.toLowerCase(),
    password: passwordHash,
    email: user.email.toLowerCase(),
    name: user.name,
    group: user.group,
    createdAt: new Date(),
  };

  const docRef = await db.collection("users").add(userDoc);
  return docRef.id;
};

export const authenticateUser = async (username: string, password: string) => {
  try {
    const userSnapshot = await db
      .collection("users")
      .where("username", "==", username.toLowerCase())
      .limit(1)
      .get();

    if (userSnapshot.empty) {
      return null;
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    const isPasswordValid = await bcrypt.compare(password, userData.password);

    if (!isPasswordValid) {
      return null;
    }

    return { id: userDoc.id, ...userData };
  } catch (error) {
    console.error("Error authenticating user:", error);
    throw new Error("Authentication failed");
  }
};
