import Joi, { ObjectSchema } from "joi";
const validation = (schema: Joi.ObjectSchema, input: any) => {
  const { error } = schema.validate(input); //abort early -> if one of the inputs is with error then abort the check (if true)

  if (!error) {
    return null;
  }
  //No need to loop over the errors because no need to abort early
  const { message } = error.details[0];
  return message;
};

export default validation;
