const handleError = (res, error) => {
  const { message } = error.details[0];
  const errorStatus = message.includes('greater') ? 422 : 400;
  res.status(errorStatus).json({ message });
};

module.exports = handleError;