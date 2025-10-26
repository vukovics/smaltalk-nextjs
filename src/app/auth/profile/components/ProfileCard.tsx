"use client";

import { updateAuthProfile } from "@/lib/authService";
import { auth } from "@/lib/firebase";
import { updateUserProfile } from "@/lib/userService";
import { useUserStore } from "@/store/userStore";
import { PencilIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

export default function ProfileCard() {
  // ✅ Use selectors instead of destructuring
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const { displayName } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  const [mounted, setMounted] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const editProfile = () => {
    setIsEditing(true);
  };

  const saveProfile = async () => {
    setIsLoading(true);

    const currentUser = auth.currentUser;

    if (!currentUser?.uid) {
      throw new Error("No user logged in");
    }

    try {
      // ✅ Step 1: Update Firebase Auth
      await updateAuthProfile(displayName);

      // ✅ Step 2: Also update Firestore (if you want)
      await updateUserProfile(currentUser?.uid, displayName);

      // Step 3: Update local state
      useUserStore.setState({ displayName });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <div className="inline-flex items-center gap-2 justify-between w-full">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          User Profile
        </h3>
        <div className="horizontal-center vertical-center pull-right">
          <PencilIcon
            className="w-4 h-4 text-blue-500 cursor-pointer horizontal-center vertical-center center"
            onClick={editProfile}
          />
        </div>
      </div>

      {isLoggedIn ? (
        <>
          <div className="space-y-3">
            <div>
              {isEditing ? (
                <>
                  <input
                    disabled={isLoading}
                    type="text"
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    value={displayName}
                    onChange={(e) =>
                      useUserStore.setState({ displayName: e.target.value })
                    }
                  />
                </>
              ) : (
                <p className="text-base font-medium text-gray-900 dark:text-white">
                  {displayName || "No displayName"}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={saveProfile}
            disabled={isLoading}
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-900 dark:hover:bg-blue-800 text-white dark:text-white py-2 px-4 rounded-md transition-colors"
          >
            Save Changes
          </button>
        </>
      ) : (
        <p className="text-gray-500">Please log in</p>
      )}
    </div>
  );
}
