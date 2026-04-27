import { useAuthStore } from "@/stores/auth";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useCallback, useEffect } from "react";

export function useAuth() {
  const {
    identity,
    loginStatus,
    login,
    clear,
    isAuthenticated: identityAuthenticated,
  } = useInternetIdentity();
  const { principal, setAuth, clearAuth } = useAuthStore();

  // Sync identity into store on every change
  useEffect(() => {
    if (identityAuthenticated && identity) {
      const principalStr = identity.getPrincipal().toText();
      setAuth(identity, principalStr);
    } else if (!identityAuthenticated) {
      clearAuth();
    }
  }, [identity, identityAuthenticated, setAuth, clearAuth]);

  const logout = useCallback(() => {
    clear();
    clearAuth();
  }, [clear, clearAuth]);

  return {
    isAuthenticated: identityAuthenticated,
    principal,
    identity,
    loginStatus,
    login,
    logout,
  };
}
