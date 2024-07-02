## PostgresSQL references & operators:


- Создание таблиц со связями one-to-many и many-to-many, заполнение значениями, получение данных.

```sql
 CREATE DATABASE library;
CREATE TABLE
  author (id serial PRIMARY KEY, name varchar(60));
CREATE TABLE
  book (
    id serial PRIMARY KEY,
    title varchar(60),
    year_of_publish integer,
    author_id integer REFERENCES author (id)
  );
CREATE TABLE
  genre (id serial PRIMARY KEY, title varchar(60));
CREATE TABLE
  genre_book (
    genre_id integer REFERENCES genre (id),
    book_id integer REFERENCES book (id)
  );
INSERT INTO
  author (name)
VALUES
  ('Tolkien'),
  ('Roaling'),
  ('Martin');
INSERT INTO
  book (title, year_of_publish, author_id)
VALUES
  ('Lord of the Rings', 2000, 1),
  ('Prisoner of Azkaban', 1995, 2),
  ('Deathly Hollows', 2012, 2),
  ('Winds of Winter', 2060, 3),
  ('Dance with Dragons', 2011, 3);
INSERT INTO
  genre (title)
VALUES
  ('Fantasy'),
  ('Adventure'),
  ('History'),
  ('For kids'),
  ('Magic'),
  ('Horror'),
  ('Detective');
INSERT INTO
  genre_book (book_id, genre_id)
VALUES
  (1, 1),
  (1, 2),
  (1, 5),
  (2, 1),
  (2, 2),
  (2, 4),
  (2, 7),
  (3, 1),
  (3, 2),
  (3, 4),
  (4, 1),
  (4, 3),
  (4, 6),
  (5, 1),
  (5, 3),
  (5, 6);
SELECT
  author.name,
  book.title,
  book.year_of_publish,
  genre.title
FROM
  author
  JOIN book ON author.id = book.author_id
  JOIN genre_book ON book.id = genre_book.book_id
  JOIN genre ON genre.id = genre_book.genre_id;
```

- Получение данных выборочных данных с псевдонимами и группировкой.


```sql
SELECT
  author.name AS author_name,
  book.title AS book_title,
  book.year_of_publish,
  STRING_AGG(genre.title, ', ') AS genres
FROM
  author
  JOIN book ON author.id = book.author_id
  JOIN genre_book ON book.id = genre_book.book_id
  JOIN genre ON genre.id = genre_book.genre_id
GROUP BY
  author.name,
  book.title,
  book.year_of_publish
```

- Создание образца данных


```sql
 CREATE TABLE
  brotherhood (
    id SERIAL PRIMARY KEY,
    name varchar(60),
    race varchar(60),
    is_alive boolean,
    age integer,
    has_magic boolean
  );
INSERT INTO
  brotherhood (name, race, is_alive, age, has_magic)
VALUES
  ('Frodo', 'hobbit', true, 30, false),
  ('Aragorn', 'human', true, 45, false),
  ('Gendalf', 'magican', true, 1000, true),
  ('Legolas', 'elf', true, 300, true),
  ('Boromir', 'human', false, 40, false),
  ('Ghimli', 'dwarf', true, 50, false),
  ('Sam', 'hobbit', true, 28, false);
SELECT
  *
FROM
  brotherhood
WHERE
	age > 40;

```

- Получение данных по поиску вхождения подстроки like
- like чувствителен к регистру, в отличие от ilike

```sql
SELECT
  *
FROM
  brotherhood
WHERE
  name LIKE 'Gi%';
```

- Получение данных по условию between


```sql
SELECT
  *
FROM
  brotherhood
WHERE
	age > 40;

SELECT
  *
FROM
  brotherhood
WHERE age BETWEEN 40 AND 1000;


```

- уточнение группировки по условию с оператором HAVING

```sql
SELECT
  race,
  MIN(age) AS min_age,
  COUNT(id)
FROM
  brotherhood
GROUP BY
  race
HAVING COUNT(id) > 1;

```

- пример каскадного удаления связанных таблиц при удалении источника ссылочного ключа
- пример с постами аналогичный примеру в лекции. Но теперь в роли связанной таблицы - post. источник user_profile

```sql
 CREATE TABLE
  post (id serial PRIMARY KEY, post varchar(60));
CREATE TABLE
  user_profile (
    id serial PRIMARY KEY,
    name varchar(60),
    post_id integer REFERENCES post (id) ON DELETE CASCADE
  );
INSERT INTO
  post (post)
VALUES
  ('post 1'),
  ('post 2'),
  ('post 3');
INSERT INTO
  user_profile (name, post_id)
VALUES
  ('Aragorn', 1),
  ('Frodo', 2),
  ('Ghimli', 3);
DELETE FROM
  user_profile
WHERE
  id = 3;
```
