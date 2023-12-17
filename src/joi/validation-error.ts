import Joi from "joi";

const validation = (schema: Joi.ObjectSchema, userInput: any) => {
  //Get error from the validate function's result
  const { error } = schema.validate(userInput);
  //If there was no error return null
  if (!error) {
    return null;
  }
  //We are only interseted in the first error
  const { message, path } = error.details[0];
  return { message, path };
};

export default validation;
