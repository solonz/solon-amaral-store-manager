const idSchemaa = require('./schema');

const validateId = (id) => {
  const { error } = idSchemaa.idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };
  return { type: null, message: '' };
};

module.exports = {
  validateId,
};