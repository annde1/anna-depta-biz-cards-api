import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IJWTPayload } from "../@types/user";
const authService = {
  //Method for hashing the password (takes in password string, default round parameter = 12):
  hashPassword: (plainTextPassword: string, rounds = 12) => {
    return bcrypt.hash(plainTextPassword, rounds);
  },
  //Method for validating the password (takes in password string that user provided and hashed user password)
  validatePassword: (plainTextPassword: string, hash: string) => {
    return bcrypt.compare(plainTextPassword, hash);
  },
  //Method for generating new JWT token (takes in one argument which is payload - user specific data ex.: email)
  generateJWT: (payload: IJWTPayload) => {
    const secret = process.env.JWT_SECRET!;
    return jwt.sign(payload, secret);
  },
  //Method for verifying JWT token (takes in one argument which is token that the user provided)
  verifyJWT: (token: string) => {
    const secret = process.env.JWT_SECRET!;
    //Using the jwt verify method, which takes in token and secret
    const payload = jwt.verify(token, secret);
    return payload as IJWTPayload & { iat: number };
  },
};

// export the entire object:
export { authService as auth };
