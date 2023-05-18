import { CognitoUserPool } from "amazon-cognito-identity-js";

console.log(import.meta.env.USER_POOL_ID);

const poolData = {
  UserPoolId: import.meta.env.VITE_USER_POOL_ID,
  ClientId: import.meta.env.VITE_CLIENT_ID,
};

export default new CognitoUserPool(poolData);
