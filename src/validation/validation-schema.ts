import Joi from "joi";
const validation = (schema: Joi.ObjectSchema, input: any) => {
  const { error } = schema.validate(input); //Destructure error property from the object

  //If there was no error then return null
  if (!error) {
    return null;
  }
  //Destructure message property from the details array at location 0 and return it. We are only interested in the first one because we will fail the request if at least one fails, so getting all the messages doesn't matter
  const { message } = error.details[0];
  return message;
};

export default validation;
