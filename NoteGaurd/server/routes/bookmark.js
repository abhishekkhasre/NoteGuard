const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/checkAuth');
const bookmarkController = require('../controllers/BookmarkController');

/**
 * bookmark Routes 
*/

router.get('/bookmark', isLoggedIn, bookmarkController.bookmark);
router.get('/bookmark/item/:id', isLoggedIn, bookmarkController.bookmarkViewNote);
router.put('/bookmark/item/:id', isLoggedIn, bookmarkController.bookmarkUpdateNote);
router.delete('/bookmark/item-delete/:id', isLoggedIn, bookmarkController.bookmarkDeleteNote);
router.get('/bookmark/add', isLoggedIn, bookmarkController.bookmarkAddNote);
router.post('/bookmark/add', isLoggedIn, bookmarkController.bookmarkAddNoteSubmit); 
router.post('/bookmark/search', isLoggedIn, bookmarkController.bookmarkSearchSubmit);

module.exports = router;