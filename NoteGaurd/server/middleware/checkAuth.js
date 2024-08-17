const mainController= require('../controllers/mainController');

exports.isLoggedIn = function (req, res, next) {
  if(req.user) {
    next();
  } else {
    return mainController.homepage(req, res);
    // return res.status(401).send('Access Denied');
  }
}