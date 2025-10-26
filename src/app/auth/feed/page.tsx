"use client";

import { useUserStore } from "@/store/userStore";
import RecentMessages from "./components/RecentMessages";
import { useEffect, useState } from "react";
import { getRecentMessages, Message } from "@/lib/messageService";
import MessageCard from "./components/MessageCard";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Feed() {
  const { displayName } = useUserStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const router = useRouter();

  const fetchMessages = async () => {
    const msgs = await getRecentMessages();
    setMessages(msgs);
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchMessages();
      } else {
        toast.error("User not signed in, cannot fetch messages");
        router.push("/login");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Feed - {displayName || "Guest"}
        </h1>

        <div className="full-width">
          <div className=" full-width mb-6">
            <MessageCard onMessageSent={fetchMessages} />
          </div>
          <div>
            {messages.map((message) => (
              <RecentMessages
                key={message.id}
                message={message}
                onMessageUpdated={fetchMessages}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
