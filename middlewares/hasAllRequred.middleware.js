module.exports = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "name is required" });
  }
  if (!req.body?.price) {
    return res.status(400).json({ error: "price is required" });
  }

  next()
};
