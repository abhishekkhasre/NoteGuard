require('dotenv').config();
// This middleware checks JWT authentication for password manager routes
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY =process.env.JWT_SECRET_KEY;
const checkPasswordAuth = (req, res, next) => {
  try {
    const token = req.cookies.password_jwt;

    if (!token) {
      return res.redirect('/password/login');
    }

    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.redirect('/password/login');
      }

      // If token is valid, set the decoded user ID in the request object for further use
      req.userId = decoded.userId;
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('password/login', { error: 'Server error' });
  }
};

module.exports = checkPasswordAuth;
