const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Expect token in Authorization header: "Bearer <token>"
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = decoded; // { id: ... }
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};
