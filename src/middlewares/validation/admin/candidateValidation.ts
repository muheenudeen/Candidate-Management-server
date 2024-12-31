import Joi from "joi";

export const candidateCreateValidation = Joi.object({
  name: Joi.string().required(),
  address:Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().min(6).required(),
});