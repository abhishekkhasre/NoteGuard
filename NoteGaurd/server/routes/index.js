const express= require('express');
const router = express.Router();
const mainController= require('../controllers/mainController');
const { isLoggedIn } = require('../middleware/checkAuth');
const dashboardController = require("../controllers/dashboardController")



router.get('/',isLoggedIn,dashboardController.dashboard);
router.get('/about',mainController.about);
router.get('/feature',mainController.feature);
router.get('/faq',mainController.faq);

module.exports = router;