create table users (
    id serial primary key,
    first_name varchar(100),
    last_name varchar(100),
    email varchar(200)
);

create table books (
    id serial primary key,
    name varchar(200),
    author varchar(100),
    genre varchar(100)
);

create table reviews (
    id serial primary key,
    score integer,
    content text,
    book_id integer references books(id),
    user_id integer references users(id)
);
