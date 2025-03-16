import Joi from "joi";

export const addMovieValidator = Joi.object({
  userId: Joi.string().required(),
  title: Joi.string().required(),
  status: Joi.string().valid("watched", "not watched").required(),
  image: Joi.string().optional()
});