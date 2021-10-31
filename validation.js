const Joi = require("@hapi/joi");

// register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    childName: Joi.string().min(4).required(),
    email: Joi.string().min(4).required().email(),
    password: Joi.string().min(4).required(),
    contactNumber: Joi.number().min(10).required(),
    childDob: Joi.date().required(),
    gender: Joi.string().required(),
    languagePreference: Joi.string().required(),
  });
  return schema.validate(data);
};

// login validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(4).required().email(),
    password: Joi.string().min(4).required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
