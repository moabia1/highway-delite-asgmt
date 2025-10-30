module.exports = (schema) => (req, res, next) => {
  // Lightweight validation helper: schema is an object with required fields
  const missing = [];
  Object.keys(schema).forEach((key) => {
    if (
      schema[key].required &&
      (req.body[key] === undefined ||
        req.body[key] === null ||
        req.body[key] === "")
    ) {
      missing.push(key);
    }
  });
  
  if (missing.length)
    return res.status(400).json({ message: "Missing fields", fields: missing });
  next();
};
