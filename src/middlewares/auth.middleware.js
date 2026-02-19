const { verifyToken } = require("../utils/jwt");

function auth(req, res, next) {
  const header = req.headers.authorization;

  // Check if token exists
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Missing or invalid Authorization header",
    });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = verifyToken(token);

    // Attach user info to request
    req.user = decoded; // { userId, email }

    return next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

module.exports = { auth };
