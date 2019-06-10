const chai = require('chai'),
    expect = chai.expect,
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised).should();

const User = require('../models/user'),
    Review = require('../models/reviewModel'),
    Book = require('../models/booksModel');


describe('User model tests', () => {
    //given an email address, do we get a user object in return?
    it('should be a valid user object', async () => {
        const userInstance = new User(null, null, null, 'italianstallion@yahoo.com', null);
        const theUser = await userInstance.getUserByEmail();
        console.log("the user is", theUser);
        expect(theUser).to.be.an('object');
    });

    it('should NOT be undefined', async () => {
        const userInstance = new User(null, null, null, 'italianstallion@yahoo.com', null);
        const theUser = await userInstance.getUserByEmail();
        expect(theUser.id).to.not.be.an('undefined');
    });

    it('should get a list of all users', async () => {
        const allUsers = await User.getAllUsers();
        expect(allUsers).to.not.be.an('undefined');
    });
});

describe('Book model tests', () => {
    it('should be a valid book object', async () => {
        const theBook = await Book.getOne(2);
        expect(theBook).to.be.an('object');
    });

    it('should get a list of all books', async () => {
        const allBooks = await Book.getAll();
        expect(allBooks).to.not.be.an('undefined');
    });
    
    it('should create a new review', async () => {
        const newReview = await Book.createReview(1, null, null, null);
        expect(newReview).to.not.be.an('undefined');
    });
});

describe('Review model tests', () => {
    it('should get all reviews for a book', async () => {
        const bookReviews = await Review.getReviews(1);
        expect(bookReviews).to.not.be.an('undefined');
    });
});