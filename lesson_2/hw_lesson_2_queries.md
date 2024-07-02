### Задание 1
Создайте схему для некоторой предметной области на ваш выбор 
(например: ресторан, детский сад, ферма), где у вас будет несколько таблиц. 
Пусть на ней будут отражены отношения: 1:1, 1:many, many:1, many:many.

### Задание 2
Создайте таблицы со своей схемы с помошью SQL, отразите отношения между ними, 
задав внешние и первичные ключи.
____________________________________________

CREATE DATABASE coursePlatform
CREATE TABLE
student (id serial PRIMARY KEY, name varchar(80));

CREATE TABLE
course (
id serial PRIMARY KEY,
title varchar(80),
description varchar(80)
);

CREATE TABLE
test (
id serial PRIMARY KEY,
title varchar(80),
course_id int,
FOREIGN KEY (course_id) REFERENCES course (id),
questions json
);

CREATE TABLE
testresult (
id serial PRIMARY KEY,
test_id int,
FOREIGN KEY (test_id) REFERENCES test (id),
student_id int,
FOREIGN KEY (student_id) REFERENCES student (id),
result DOUBLE PRECISION
);

CREATE TABLE
student_testresult (
student_id int,
FOREIGN KEY (student_id) REFERENCES student (id),
testresult_id int,
FOREIGN KEY (testresult_id) REFERENCES testresult (id)
);

CREATE TABLE
student_course (
student_id int,
FOREIGN KEY (student_id) REFERENCES student (id),
course_id int,
FOREIGN KEY (course_id) REFERENCES course (id)
);

ALTER TABLE
student
ADD COLUMN
email varchar(70);

INSERT INTO
student (name, email)
VALUES
('Terrance', 'terrance@fart.mouth'),
('Philip', 'terrance@fart.mouth'),
('Stan', 'marsh@south.park'),
('Kyle', 'broflovski@south.park'),
('Eric', 'cartman@south.park'),
('Kenny', 'mccormick@south.park');

INSERT INTO
course (title, description)
VALUES
('surviving', 'surviving ovverall'),
('helping', 'helping world'),
('resolving', 'resolving the worlds'' problelms');

ALTER TABLE
test
ADD COLUMN
coorect_answer int;

INSERT INTO
test (title, course_id, questions, coorect_answer)
VALUES
('Surviving in a war with canadians', 1, '{"1": "Kill or been killed", "2": "Kill or been killed"}', 1),
('Helping the world', 2, '{"1": "Make Satan go back to hell", "2": "Give solutions to government"}', 2),
('Resolving problems', 3, '{"1": "Use AI", "2": "Ask Towel"}', 1);


INSERT INTO
student_course (student_id, course_id)
VALUES
(1, 1),
(2, 1),
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(1, 2),
(2, 2),
(3, 2),
(4, 2),
(1, 3),
(2, 3),
(3, 3),
(4, 3),
(5, 1),
(6, 1),
(5, 2),
(6, 3);

INSERT INTO
testresult (test_id, student_id, result)
VALUES
(1, 1, 7),
(2, 1, 3),
(1, 2, 5.6),
(2, 2, 3.4),
(3, 1, 3),

(1, 4, 4),
(2, 5, 9),
(3, 6, 9.9),

(1, 3, 7),
(2, 4, 8),
(3, 4, 5.6),

(1, 5, 2),
(2, 5, 4.78),
(3, 4, 9.99);

INSERT INTO
student_testresult (student_id, testresult_id)
SELECT
student_id, id
FROM
testresult;


-- SELECT
--   student.name,
--   course.title,
--   test.title,
--   testresult.result
-- FROM
--   student_testresult
--   JOIN student ON student.id = student_testresult.student_id
--   JOIN student_course ON student.id = student_course.student_id
--   JOIN course ON student_course.course_id = course.id
--   JOIN test ON course.id = test.course_id
--   JOIN testresult ON test.id = testresult.test_id
-- 	;

SELECT
student.name,
course.title,
test.title,
testresult.result
FROM
student
JOIN testresult ON student.id = testresult.student_id
JOIN test ON test.id = testresult.test_id
JOIN course ON course.id = test.course_id
GROUP BY
student.name,
course.title,
test.title,
testresult.result
ORDER BY
student.name ASC;