import type { Identity } from "@icp-sdk/core/agent";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  principal: string | null;
  identity: Identity | null;
  setAuth: (identity: Identity, principal: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      principal: null,
      identity: null,
      setAuth: (identity, principal) =>
        set({ isAuthenticated: true, principal, identity }),
      clearAuth: () =>
        set({ isAuthenticated: false, principal: null, identity: null }),
    }),
    {
      name: "internship-coach-auth",
      // Don't persist the identity object (not serializable), only flags
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        principal: state.principal,
      }),
    },
  ),
);
