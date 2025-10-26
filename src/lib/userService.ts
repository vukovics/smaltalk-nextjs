import { db } from "./firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export interface UserProfile {
  username: string;
  email: string;
  isLoggedIn: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export async function getUserProfile(
  userId: string
): Promise<UserProfile | null> {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
}

export async function updateUserProfile(
  userId: string,
  displayName: string
): Promise<void> {
  try {
    const docRef = doc(db, "users", userId);

    await updateDoc(docRef, {
      displayName,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}

export async function createUserProfile(
  userId: string,
  displayName: string,
  email: string
): Promise<void> {
  try {
    const docRef = doc(db, "users", userId);

    await setDoc(docRef, {
      displayName,
      email,
      isLoggedIn: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
}
