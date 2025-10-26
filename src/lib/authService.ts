import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile,
} from "firebase/auth";
import { createUserProfile } from "./userService";

export async function loginWithEmail(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
}

export async function registerWithEmail(
  email: string,
  password: string,
  displayName: string
) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(userCredential.user, {
    displayName: displayName,
    // photoURL: 'https://example.com/photo.jpg', // Optional
  });

  await createUserProfile(userCredential.user.uid, displayName, email);

  return userCredential.user;
}

export async function logout() {
  await signOut(auth);
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export async function updateAuthProfile(
  displayName: string,
  photoURL?: string
) {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("No user logged in");
  }

  await updateProfile(currentUser, {
    displayName,
    photoURL,
  });
}
