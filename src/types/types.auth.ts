import { User, UserCredential } from "firebase/auth";
export type AuthContextType = {
  currentUser: User | null | undefined;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  logIn: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUser: (email?: string, photoUrl?: string) => Promise<void>;
};
