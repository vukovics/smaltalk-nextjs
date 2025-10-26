import { create } from "zustand";
import { persist } from "zustand/middleware";
import { updateUserProfile } from "@/lib/userService";
import { User } from "firebase/auth";

interface UserState {
  userId: string | null;
  displayName: string;
  email: string;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  updateUser: (username: string, email: string) => Promise<void>;
  login: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // State
      userId: null,
      displayName: "",
      email: "",
      isLoggedIn: false,
      isLoading: false,
      error: null,

      // ✅ Update user with Firebase
      updateUser: async (displayName: string, email: string) => {
        const { userId } = get();

        if (!userId) {
          set({ error: "No user ID found" });
          return;
        }

        set({ isLoading: true, error: null });

        try {
          // ✅ Save to Firebase first
          await updateUserProfile(userId, displayName);

          // ✅ Then update local state
          set({
            displayName,
            email,
            isLoggedIn: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Failed to update",
            isLoading: false,
          });
          throw error;
        }
      },

      login: (user: User) =>
        set({
          userId: user.uid,
          displayName: user.displayName || "",
          email: user.email || "",
          isLoggedIn: true,
          isLoading: false,
          error: null,
        }),

      logout: () =>
        set({
          userId: null,
          displayName: "",
          email: "",
          isLoggedIn: false,
        }),

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      setError: (error: string | null) => set({ error }),
    }),
    {
      name: "user-storage",
    }
  )
);
