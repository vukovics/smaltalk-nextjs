import { db, auth } from "./firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  getDocs,
  Timestamp,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";

export interface Message {
  id: string;
  message: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId: string;
  userDisplayName: string;
  likes: number;
}

export interface MessageInput {
  message: string;
}

export async function createMessage(messageText: string): Promise<string> {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("User must be logged in to post messages");
  }

  if (!messageText.trim()) {
    throw new Error("Message cannot be empty");
  }

  try {
    const docRef = await addDoc(collection(db, "messages"), {
      message: messageText.trim(),
      userId: currentUser.uid,
      userDisplayName: currentUser.displayName || "Anonymous",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    console.log("✅ Message created with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error creating message:", error);
    throw error;
  }
}

export async function getRecentMessages(
  limitCount: number = 50
): Promise<Message[]> {
  try {
    const messagesQuery = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(limitCount)
    );

    const snapshot = await getDocs(messagesQuery);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Message[];
  } catch (error) {
    console.error("Error getting messages:", error);
    throw error;
  }
}

export async function updateMessageFirebase(
  messageId: string,
  message: string
): Promise<void> {
  try {
    const docRef = doc(db, "messages", messageId);
    await updateDoc(docRef, { message });
  } catch (error) {
    console.error("Error updating message:", error);
    throw error;
  }
}

export async function addLikeToMessage(messageId: string): Promise<void> {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("User must be logged in to like a message");
  }
  try {
    const docRef = doc(db, "messages", messageId);
    await updateDoc(docRef, { likes: increment(1) });
  } catch (error) {
    console.error("Error adding like to message:", error);
    throw error;
  }
}
