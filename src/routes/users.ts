import { Router } from "express";
import { User } from "../database/model/user";
import { validateLogin, validateRegistration } from "../middleware/validation";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ILogin, IUser } from "../@types/user";
import { createUser } from "../service/user-service";
import { validateUser } from "../service/user-service";

//Create router
const router = Router();

//Route for getting all users
router.get("/", async (req, res) => {
  try {
    //find all users
    const allUsers = await User.find();
    //Send as response the array of all users
    res.json(allUsers);
  } catch (err) {
    res.status(500).json({ message: "server error", err });
  }
});

//Route for creating new user. Middleware (validate registration) -> router
router.post("/", validateRegistration, async (req, res, next) => {
  try {
    // const userBody = req.body;
    // //Create new user with the details provided in body of the request
    // const user = new User(userBody);
    // //algorithm 12 salt hash (encrypt the users password using the hash algorithm). Authentication
    // user.password = await bcrypt.hash(user.password, 12);
    // //Save user's details in the database
    // const saved = await user.save();
    // //Send response wth status 201 (OK) user saved
    // res.status(201).json({ message: "Saved", user: saved });
    const saved = await createUser(req.body as IUser);
    res.status(201).json({ message: "Saved", user: saved });
  } catch (err) {
    //If there was en error send status 400 with message
    next(err);
  }
});
//Route for user login:
router.post("/login", validateLogin, async (req, res, next) => {
  //check the password and email types:
  // const { email, password } = req.body as ILogin;
  //Find the user in database:
  // const user = await User.findOne({ email });
  // //If no user was found send response with status 400
  // if (!user) {
  //   return res.status(400).json({
  //     message: "Login failed. Incorrect email or password",
  //   });
  // }
  // //Check the password provided by user with the hashed password stored in user object in the database. Returns true or false
  // const isPasswordValid = await bcrypt.compare(password, user.password);
  // //If isPasswordValid returns false then respond with status 400
  // if (!isPasswordValid) {
  //   return res.status(400).json({
  //     message: "Incorrect password. Try again.",
  //   });
  // }
  // //User details were correct, create JWT token (authorization)
  // //Get secret from environment variables:
  // const secret = process.env.JWT_SECRET!;
  // //Parameter 1:  payload, 2: secret key. Payload can be anything that helps you identify the user. HWT token expires every now and then
  // const jwt = JWT.sign({ email: user.email }, secret);
  // //Send the JWT token as response:
  // res.json({ jwt });
  try {
    //check the request:
    const { email, password } = req.body as ILogin;

    //call the service:
    const jwt = await validateUser(email, password);

    //response
    res.json(jwt);
  } catch (e) {
    next(e);
  }
});

export { router as usersRouter };
//Access token, refresh token. When the access expires then we make req for another token with the refresh token. The refresh token expires when the session expires
//Database:
//connect, mongo-schema, model
//Router:
//validate body (joi-schema), other route logic
