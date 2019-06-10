const express = require('express'),
    router = express.Router(),
    BooksControllers = require('../controllers/bookController');

router.get('/', BooksControllers.book_list_get);

router.get('/:book_id', BooksControllers.book_info_get);

router.post('/', BooksControllers.book_review_post);

module.exports = router;