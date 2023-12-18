import { RequestHandler, Request } from "express";
import { BizCardsError } from "../error/biz-cards-error";
import { auth } from "../service/auth-service";
import { User } from "../database/model/user";

//Function to extract token
const extractToken = (req: Request) => {
  //Extract the header from the request
  const authHeader = req.header("Authorization"); //"bearer aslkfdjasfl2ejroi2ejwroi32jerf"

  if (
    authHeader &&
    authHeader.length > 7 &&
    authHeader.toLowerCase().startsWith("bearer ")
  ) {
    //Return just the token itself
    return authHeader.substring(7);
  }
  //If no token was provided throw error
  throw new BizCardsError("token is missing in Authorization header", 400);
};

//Function to check if isAdmin
const isAdmin: RequestHandler = async (req, res, next) => {
  //Extract the token
  const token = extractToken(req);
  //Verify JWT token and get email from payload
  const { id } = auth.verifyJWT(token);

  //Find admin in the database
  const user = await User.findById(id);

  //Returns true or false
  const isAdmin = user?.isAdmin;
  console.log(isAdmin);
  //If isAdmin is true go to next in the chain
  if (isAdmin) {
    return next();
  }
  //User is unauthorized send response with status 401 and message
  return res.status(401).json({ message: "Must be admin" });
};

export { isAdmin, extractToken };
