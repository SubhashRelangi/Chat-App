import { create } from "zustand";
import axiosInstance from "../lib/axios.js";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoading: false,
    isUpdatingProfile: false,

    isCheckingAuth: true, // initially true

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            if (res.status === 200) {
                set({ authUser: res.data.user });
            } else {
                set({ authUser: null });
            }
        } catch (error) {
            console.log("Error checking auth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },
}));
