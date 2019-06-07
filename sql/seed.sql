insert into users
    (first_name, last_name, email)
values
    ('Lester', 'Strange', 'bepboys@gmail.com'),
    ('Jim', 'Lahey', 'jimlahey@sunnyvaletrailerpark.com'),
    ('Salvor', 'Hardin', 'salvorhardin@terminus.com');

insert into books
    (name, author, genre)
values
    ('Leviathan Wakes', 'James S. Corey', 'Science Fiction'),
    ('Fellowship of the Ring', 'J.R.R. Tolkein', 'Fantasy'),
    ('Coding For Dummies', 'Anon', 'Educational');

insert into reviews
    (score, content, book_id, user_id)
values
    (5, 'This book was a masterful piece of science fiction!', 1, 1),
    (4, 'It was a good book but ijust droned on and on and on.', 2, 2),
    (1, 'The lives of primitives does not concern me', 1, 3),
    (3, 'I guess I am too dumb, even for this book', 3, 2),
    (1, 'Primitive forms of programming from ancient times. These techiniques are obsolete', 3, 3);
