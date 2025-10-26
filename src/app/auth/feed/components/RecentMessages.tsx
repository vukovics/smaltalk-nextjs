import { auth } from "@/lib/firebase";
import { Message, updateMessageFirebase } from "@/lib/messageService";
import { PencilIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import toast from "react-hot-toast";

interface RecentMessagesProps {
  message: Message;
  onMessageUpdated?: () => void;
}

export default function RecentMessages({
  message,
  onMessageUpdated,
}: RecentMessagesProps) {
  const [isEditing, setIsEditing] = useState(false);
  const currentUser = auth.currentUser;
  const [messageText, setMessageText] = useState(message.message);

  const editMessage = () => {
    setIsEditing(!isEditing);
  };

  const updateMessage = async () => {
    setIsEditing(true);
    try {
      await updateMessageFirebase(message.id, messageText);
      setIsEditing(false);
      toast.success("Message updated successfully");
      onMessageUpdated?.();
    } catch (error) {
      toast.error("Error updating message");
      console.error("Error updating message:", error);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className=" mb-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      {currentUser?.uid === message.userId && (
        <PencilIcon
          className="w-4 h-4 text-blue-500 cursor-pointer float-right"
          onClick={editMessage}
        />
      )}
      {isEditing ? (
        <>
          <textarea
            onChange={(e) => setMessageText(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            value={messageText}
          />
          <button
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-900 dark:hover:bg-blue-800 text-white dark:text-white py-2 px-4 rounded-md transition-colors"
            onClick={updateMessage}
          >
            Update
          </button>
        </>
      ) : (
        <div className="text-gray-900 dark:text-white mb-4">
          {message.message}
        </div>
      )}
      <div className="space-y-4">
        <div key={message.id}>
          <div>{message.userDisplayName}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {message.createdAt.toDate().toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
