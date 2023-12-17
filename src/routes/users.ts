import { Router } from "express";
import { User } from "../database/model/user";
import { validateLogin, validateRegistration } from "../middleware/validation";
import { ILogin, IUser } from "../@types/user";
import { createUser } from "../service/user-service";
import { validateUser } from "../service/user-service";

//Create router
const router = Router();

//Route for getting all users. Check if isAdmin -> router
router.get("/", async (req, res) => {
  try {
    //Find all users in the databse using the User mongoose model
    const allUsers = await User.find();
    //Send as response the array of all users
    res.json(allUsers);
  } catch (err) {
    res.status(500).json({ message: "server error", err });
  }
});

//Route for creating new user. Joi register validation -> router
router.post("/", validateRegistration, async (req, res, next) => {
  try {
    //Create new user by using createUser function
    const saved = await createUser(req.body as IUser);
    //Return response with status 201 and message:
    res.status(201).json({ message: "Saved", user: saved });
  } catch (err) {
    next(err);
  }
});

//Route for user login. Joi login validation -> router
router.post("/login", validateLogin, async (req, res, next) => {
  try {
    //Check the request and destructure email and password:
    const { email, password } = req.body as ILogin;
    //Validate the user with validateUser function (returns new JWT token):
    const jwt = await validateUser(email, password);
    //Send the response with generated JWT token
    res.json(jwt);
  } catch (err) {
    next(err);
  }
});

export { router as usersRouter };
