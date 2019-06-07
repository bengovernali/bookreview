const db = require('./conn.js');

class Reviews {
    constructor(name, score, content, first_name, last_name) {
        this.name = name;
        this.score = score;
        this.content = content;
        this.first_name = first_name;
        this.last_name = last_name;
    }

    static async getReviews(b_id) {
        try {
            let response = await db.any(
                `select
                    books.name, score, content, users.first_name, users.last_name
                from
                    reviews
                inner join books
                    on books.id = ${b_id} and book_id = books.id
                inner join users
                    on users.id = user_id`
            )
            return response;
        } catch(err) {
            return err.message
        }
    }
}

module.exports = Reviews;