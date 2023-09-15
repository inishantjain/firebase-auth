import React, { useContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { AuthContextType } from "../types/types.auth";

const AuthContext = React.createContext<AuthContextType | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  function signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function updateUser(name?: string, photoUrl?: string) {
    if (auth.currentUser) return updateProfile(auth.currentUser, { displayName: name, photoURL: photoUrl });
    else throw new Error("Current user is not available");
  }

  function logOut() {
    return signOut(auth);
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const authEventIdForUnsubscribe = auth.onAuthStateChanged((user) => setCurrentUser(user));
    setLoading(false);
    return authEventIdForUnsubscribe;
  }, []);

  const value: AuthContextType = { currentUser, logIn, signUp, logOut, resetPassword, updateUser };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
