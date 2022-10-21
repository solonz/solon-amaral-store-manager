const idSchema = require('./schema');
const nameSchema = require('./schema');

const validateId = (id) => {
  const { error } = idSchema.idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };
  return { type: null, message: '' };
};

const validateName = (name) => {
  const { error } = nameSchema.nameSchema.validate(name);
  if (error) {
    // console.log(error);
    // console.log(error.message);
    // console.log(error.stack);
    return {
      type: 'INVALID_VALUE',
      response: { message: '"name" length must be at least 5 characters long' },
    };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateName,
};