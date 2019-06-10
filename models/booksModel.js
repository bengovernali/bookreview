const db = require('./conn.js');

class Books {
    constructor(id, name, author, genre){
        this.id = id;
        this.name = name;
        this.author = author;
        this.genre = genre;
    }

    static async getAll() {
        try {
            let response = await db.any(
                `select 
                    id, name 
                from 
                    books`
            );
            return response;
        } catch(err) {
            return err.message
        }
    }
    static async getOne(b_id) {
        try {
            let response = await db.one(
                `select
                    id, name, author, genre
                from
                    books
                where
                    id = ${b_id}`
            );
            return response;
        } catch(err) {
            return err.message
        }
    }
    static async createReview(id, content, score, user_id) {
        const query = `insert into reviews (score, content, book_id, user_id) values (${score}, '${content}', ${id}, ${user_id});`;
        try {
            let response = await db.result(query);
            return response;
        } catch(err) {
            return err.message
        }
    }
}

module.exports = Books;