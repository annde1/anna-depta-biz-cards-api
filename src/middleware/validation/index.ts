//--> get error -> middleware
import { joiLoginSchema } from "../../joi/login-joi";
import { joiUserSchema } from "../../joi/user-joi";
import { JoiBizNumberSchema } from "../../joi/biz-number-joi";
import { JoiCardSchema } from "../../joi/card-joi";
import { validateSchema } from "./validate-schema";

const validateRegistration = validateSchema(joiUserSchema);
const validateLogin = validateSchema(joiLoginSchema);
const validateCard = validateSchema(JoiCardSchema);
const validateBizNumber = validateSchema(JoiBizNumberSchema);
export { validateRegistration, validateLogin, validateCard, validateBizNumber };
