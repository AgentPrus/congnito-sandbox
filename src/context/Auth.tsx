import { CognitoUser } from "amazon-cognito-identity-js";
import { ReactNode, createContext, useContext } from "react";

type State = {
  user: CognitoUser | null;
};

const AuthContext = createContext<State | undefined>(undefined);

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const values = { user: null };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
