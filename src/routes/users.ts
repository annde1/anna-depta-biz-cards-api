import { Router } from "express";
import { validateLogin, validateRegistration } from "../middleware/validation";
import { ILogin, IUser } from "../@types/user";
import {
  changeBizStatus,
  createUser,
  deleteUser,
  editUser,
  getAllUsers,
  getUserById,
} from "../service/user-service";
import { validateUser } from "../service/user-service";
import { isAdminOrUser } from "../middleware/is-admin-or-user";
import { isAdmin } from "../middleware/is-admin";
import { isUser } from "../middleware/is-user";

//Create router
const router = Router();

//Route for getting all users. Access to this endpoint only for admin. Check if isAdmin -> router
router.get("/", isAdmin, async (req, res) => {
  try {
    //Get users
    const allUsers = await getAllUsers();
    //Return response with status, message and users
    res.status(201).json({ message: "OK", users: allUsers });
  } catch (err) {
    res.status(500).json({ message: "server error", err });
  }
});

//Route for getting user by id. Access to the endpoint only for account owner or admin. Check if isAdminOrUser -> router
router.get("/:id", isAdminOrUser, async (req, res, next) => {
  try {
    //Retrieve id from request params
    const { id } = req.params;
    //Find user
    const user = await getUserById(id);
    //Return response with status, message and user detials
    res.status(201).json({ message: "OK", userDetails: user });
  } catch (err) {
    next(err);
  }
});

//Route for complete update of user. Access to this endpoint only for owner of the account. Check isUser, validate data (middleware) -> router
router.put("/:id", isUser, validateRegistration, async (req, res, next) => {
  try {
    //retrieve id from request params
    const { id } = req.params;
    //Edit user
    const user = await editUser(id, req.body);
    //Send response with status 201 and user information
    res.status(201).json({ message: "User Updated", userDetails: user });
  } catch (err) {
    next(err);
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
    res.status(201).json({ message: "OK", token: jwt });
  } catch (err) {
    next(err);
  }
});

//Route for deleting user. Access to this endpoint only for admin or owner of the account
router.delete("/:id", isAdminOrUser, async (req, res, next) => {
  try {
    //retrieve id from request params
    const { id } = req.params;
    //Delete user
    const deletedUser = await deleteUser(id);
    //Return response with status, message and user details
    res.status(201).json({ message: "Deleted", userDetails: deletedUser });
  } catch (err) {
    next(err);
  }
});
//Route for changing business status of user. This endpoint is only avaiable for owner of the account
router.patch("/:id", isUser, async (req, res, next) => {
  try {
    //Get id of the user from request params
    const { id } = req.params;
    //Update user
    const updatedUser = await changeBizStatus(id);
    //Return response with status, message and user details
    res.status(201).json({ message: "Updated", userDetails: updatedUser });
  } catch (err) {
    next(err);
  }
});

export { router as usersRouter };
