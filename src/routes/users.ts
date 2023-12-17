import { Router } from "express";
import { User } from "../database/model/user";
import { validateLogin, validateRegistration } from "../middleware/validation";
import { ILogin, IUser } from "../@types/user";
import { createUser } from "../service/user-service";
import { validateUser } from "../service/user-service";
import { isAdminOrUser } from "../middleware/is-admin-or-user";
import { isAdmin } from "../middleware/is-admin";
import { isUser } from "../middleware/is-user";
import { auth } from "../service/auth-service";

//Create router
const router = Router();

//Route for getting all users. Access to this endpoint only for admin. Check if isAdmin -> router
router.get("/", isAdmin, async (req, res) => {
  try {
    //Find all users in the databse using the User mongoose model
    const allUsers = await User.find();
    //Send as response the array of all users
    res.json(allUsers);
  } catch (err) {
    res.status(500).json({ message: "server error", err });
  }
});

//Route for getting user by id. Access to the endpoint only for account owner or admin. Check if isAdminOrUser -> router
router.get("/:id", isAdminOrUser, async (req, res, next) => {
  try {
    //Retrieve id from request params
    const { id } = req.params;
    //Find the user by id in database
    const user = (await User.findById(id).lean()) as IUser;
    //Destructure password and the rest of user information
    const { password, ...rest } = user;
    //return user information
    return res.json({ user: rest });
  } catch (err) {
    next(err);
  }
});

//Route for complete update of user. Acces to this endpoint only for owner of the account. Check isUser, validate data (middleware) -> router
router.put("/:id", isUser, validateRegistration, async (req, res, next) => {
  //Hash password
  req.body.password = await auth.hashPassword(req.body.password);
  //Find and update user in database
  const savedUser = (await User.findByIdAndUpdate(
    { _id: req.params.id }, //filter
    req.body, //data
    { new: true } //return the modified document
  )) as IUser;
  //TODO : not null check ?? Ask why we need this check if we have middleware
  if (!savedUser) {
  }
  // Destructure password and the rest of user information
  const { password, ...rest } = savedUser;
  //Send response with status 201 and user information
  res.status(201).json(rest);
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
