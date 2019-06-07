const express = require('express');
const router = express.Router();
const booksModel = require('../models/booksModel');
const reviewModel = require('../models/reviewModel')

router.get('/', async (req, res, next) => {
    const allBooks = await booksModel.getAll();
    res.render('template', {
        locals: {
            title: 'List of Books',
            is_logged_in: req.session.is_logged_in,
            listOfBooks: allBooks
        },
        partials: {
            partial: 'partial-books-list'
        }
    });
});

router.get('/:book_id', async (req, res, next) => {
    const b_id = req.params.book_id;
    const oneBook = await booksModel.getOne(b_id);
    const reviews = await reviewModel.getReviews(b_id);
    res.render('template', {
        locals: {
            title: 'Book Info',
            singleBook: oneBook,
            is_logged_in: req.session.is_logged_in,
            user_id: req.session.user_id,
            bookReviews: reviews
        },
        partials: {
            partial: 'partial-single-book'
        }
    });
});

router.post('/', (req, res) => {
    const {score, content, b_id, user_id} = req.body;
    booksModel.createReview(b_id, content, score, user_id)
    /*.then(async () => {
        const oneBusiness = await businessModel.getAll();
        res.render('template', {
            locals: {
                title: 'Business Info',
                singleBusiness: oneBusiness,
                businessReviews: reviews
            },
            partials: {
                partial: 'partial-single-business'
            }
        });
    })*/
    .then( () => {
        res.sendStatus(200).end();
    })
    .catch((err) => {
        res.sendStatus(500).send(err.message);
    });
});

module.exports = router;