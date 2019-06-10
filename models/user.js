const db = require('./conn');

class User {
    constructor(id, first_name, last_name, email, password) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }

    async save() {
        try {
            const response = await db.one(`
                insert into users
                    (first_name, last_name, email, password)
                values
                    ($1, $2, $3, $4)
                returning id
                ` , [this.first_name, this.last_name, this.email, this.password]);
            return response;
        } catch(err) {
            return err.message;
        }
    }

    async getUserByEmail() {
        try {
            const response = await db.one(`
                select id, first_name, last_name, password
                    from users
                where email = $1`, [this.email]);
            return response;
        } catch(err) {
            return err.message;
        }
    }

    async getProfile() {
        try {
            const response = await db.one(`
            select first_name, last_name, email
                from users
            where users.id = $1`, [this.id]);
            const { first_name, last_name, email } = response;
            return { first_name, last_name, email };
        } catch(err) {
            return err.message;
        }
    }
}

module.exports = User;