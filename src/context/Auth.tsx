import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import UserPool from "../config/UserPool";
import { useToast } from "@chakra-ui/react";

type State = {
  signUp: (email: string, password: string) => void;
  authenticate: (Username: string, Password: string) => Promise<void>;
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
  const toast = useToast();
  const [user, setUser] = useState<State["user"]>(null);
  const [session, setSession] = useState<CognitoUserSession | null>(null);

  const signUp = useCallback(
    (email: string, password: string) => {
      return UserPool.signUp(
        email,
        password,
        [
          new CognitoUserAttribute({
            Name: "email",
            Value: email,
          }),
        ],
        [],
        (error, data) => {
          if (error) {
            toast({
              title: error.message,
              status: "error",
              isClosable: true,
            });
          } else if (data) {
            toast({
              title: `You have been successfully signed up`,
              status: "success",
              isClosable: true,
            });
            setUser(data.user);
          }
        }
      );
    },
    [toast]
  );

  const authenticate = useCallback(
    async (Username: string, Password: string) => {
      const user = new CognitoUser({
        Username,
        Pool: UserPool,
      });

      const authDetails = new AuthenticationDetails({
        Username,
        Password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log(data);

          setSession(data);
        },
        onFailure: (error) => {
          if (error) {
            toast({
              title: error.message,
              status: "error",
              isClosable: true,
            });
          }
        },
      });
    },
    [toast]
  );

  const values = useMemo(
    () => ({ user, signUp, authenticate }),
    [user, signUp, authenticate]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
