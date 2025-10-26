import { createMessage } from "@/lib/messageService";
import { useState } from "react";
import toast from "react-hot-toast";

interface MessageCardProps {
  onMessageSent?: () => void;
}

export default function MessageCard({ onMessageSent }: MessageCardProps) {
  const [message, setMessage] = useState("");

  const saveMessage = async () => {
    try {
      await createMessage(message);
      setMessage("");
      toast.success("Message sent successfully");
      onMessageSent?.();
    } catch (error) {
      toast.error("Error sending message");
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        placeholder="Write your message here"
      />
      <button
        onClick={saveMessage}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-900 dark:hover:bg-blue-800 text-white dark:text-white py-2 px-4 rounded-md transition-colors"
      >
        Send
      </button>
    </div>
  );
}
