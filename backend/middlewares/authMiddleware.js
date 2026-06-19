const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = req.cookies.token ||
      (authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null) ||
      req.body.token;

    if (!token) {
      return res
        .status(401)
        .send({ message: "No token provided", success: false });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res
          .status(401)
          .send({ message: "Token is not valid", success: false });
      }

      req.userId = decode.id;
      req.body = req.body || {};
      req.body.userId = decode.id;
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
};

module.exports = {
  authMiddleware
}