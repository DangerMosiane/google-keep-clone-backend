export const validate = (schema) => (req, res, next) => {
  try {
    req.validated = schema.parse({
      params: req.params,
      query: req.query,
      body: req.body,
    });
    next();
  } catch (e) {
    return res.status(400).json({ error: e.errors || "Invalid payload" });
  }
};
