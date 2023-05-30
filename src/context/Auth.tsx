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
  getSession: () => Promise<{
    session: CognitoUserSession;
    attributes: { [key: string]: string };
  }>;
  logout: () => void;
  session: CognitoUserSession | null;
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
  const [session, setSession] = useState<State["session"]>(null);

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

  const getSession: State["getSession"] = useCallback(async () => {
    return new Promise((resolve, reject) => {
      const userSession = UserPool.getCurrentUser();

      if (userSession) {
        userSession.getSession(
          async (error: unknown, session: CognitoUserSession) => {
            if (error) {
              console.error(error);
            } else {
              const attributes: { [key: string]: string } = await new Promise(
                (resolve, reject) => {
                  userSession.getUserAttributes((error, attributes) => {
                    if (error) {
                      reject(error);
                    } else {
                      const results: { [key: string]: string } = {};

                      if (attributes)
                        for (const attribute of attributes) {
                          const { Name, Value } = attribute;
                          results[Name] = Value;
                        }

                      resolve(results);
                    }
                  });
                }
              );

              const value = {
                session,
                attributes: attributes,
              };

              resolve(value);
            }
          }
        );
      } else {
        reject();
      }
    });
  }, []);

  const logout = useCallback(() => {
    const user = UserPool.getCurrentUser();
    if (user) {
      user.signOut();
      setSession(null);
    }
  }, []);

  const values = useMemo(
    () => ({ session, signUp, authenticate, getSession, logout }),
    [session, signUp, authenticate, getSession, logout]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
