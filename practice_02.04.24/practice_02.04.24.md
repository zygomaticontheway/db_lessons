-- CREATE DATABASE shop_43;
CREATE TABLE user_account (
id SERIAL PRIMARY KEY,
username VARCHAR(50) NOT NULL UNIQUE,
email VARCHAR(100) NOT NULL UNIQUE,
password_hash VARCHAR(255) NOT NULL,
first_name VARCHAR(50),
last_name VARCHAR(50),
address TEXT,
phone_number VARCHAR(15),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_user_account_email ON user_account(email);


CREATE TABLE category (
id SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL UNIQUE,
description VARCHAR(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE product (
id SERIAL PRIMARY KEY,
name VARCHAR (50),
description VARCHAR (255),
price DECIMAL,
stock_quantity BIGINT,
category_id INTEGER, FOREIGN KEY (category_id) REFERENCES category (id),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_product_category_id ON product(category_id);


CREATE TABLE _order (
id SERIAL PRIMARY KEY,
user_account_id INTEGER, FOREIGN KEY (user_account_id) REFERENCES user_account (id),
order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
status VARCHAR(30),
total DECIMAL
);
CREATE INDEX idx_order_user_account_id ON _order(user_account_id);


CREATE TABLE order_item (
id SERIAL PRIMARY KEY,
order_id INTEGER, FOREIGN KEY (order_id) REFERENCES _order (id),
product_id INTEGER, FOREIGN KEY (product_id) REFERENCES product (id),
quauntity INTEGER,
price DECIMAL,
total DECIMAL
);

CREATE INDEX idx_order_item_order_id ON order_item(order_id);
CREATE INDEX idx_order_item_product_id ON order_item(product_id);

CREATE TABLE wishlist (
id SERIAL PRIMARY KEY,
user_account_id INT,
product_id INT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_account_id) REFERENCES user_account (id),
FOREIGN KEY (product_id) REFERENCES product (id)
);

CREATE TABLE review (
id SERIAL PRIMARY KEY,
product_id INT,
user_account_id INT,
rating INT,
comment TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_account_id) REFERENCES user_account (id),
FOREIGN KEY (product_id) REFERENCES product (id)
);
CREATE INDEX idx_review_user_account_id ON review(user_account_id);
CREATE INDEX idx_review_product_id ON review(product_id);


CREATE TABLE product_image (
id SERIAL PRIMARY KEY,
product_id INTEGER, FOREIGN KEY (product_id) REFERENCES product (id),
image_url TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- ========================== -- ========================== -- ==========================


--1
INSERT INTO
user_account (
username,
email,
password_hash,
first_name,
last_name,
address,
phone_number
)
VALUES
('alex', 'alex@alex.al', 'aasdflkjh1k3j12', 'Alex', 'Ilchenko', 'Weinheim, Hstr 161', '+4912121231212'),
('alena', 'alena@alena.al', 'awedflkjh1k3j12', 'Alena', 'Shilimova', 'Dresden, Hstr 2', '+49121234431277'),
('katia', 'katia@katia.al', 'vvsdflkjh1k3j12', 'Katia', 'Weimer', 'Dortmund, Hstr 4', '+49151512312154'),
('dima', 'dima@dima.al', 'dimalkjh1k3j1244', 'Dima', 'Hammer', 'Berlin, Hstr 1', '+49787812312120');

--2
INSERT INTO
category (
name,
description
)
VALUES
('electonics', 'electro devices'),
('clothes', 'modern clothes'),
('food', 'something to eat'),
('cosmetics', 'somthing your girlfriend knows');

--3
INSERT INTO
product (
name,
description,
price,
stock_quantity,
category_id
)
VALUES
('iPhone 15', 'iPhone 15 256', 990,  4, 1),
('Samsung S22', 'Samsung S22 256', 990,  9, 1),
('T-shirt nike', 'T-shirt nike L', 20,  19, 2),
('Bread', 'Bread white 400g', 1.20,  40, 3),
('Parfume', 'Parfume Chanel #5', 81.30,  10, 4),
('Lipstick', 'Lipstick Oriflame red', 7.50,  13, 4);

--4
INSERT INTO
_order (
user_account_id,
status,
total
)
VALUES
(1, 'received', 88.20),
(1, 'dispatched', 188.00),
(2, 'received', 18.00),
(2, 'returned', 25.50),
(3, 'dispatched', 134.00),
(3, 'created', 1188.00),
(3, 'received', 22.80),
(4, 'created', 83.20),
(4, 'created', 43.60);


--5  
INSERT INTO
order_item (
order_id,
product_id,
quauntity,
price,
total
)
VALUES
(1, 1, 1, 990, 990),
(2, 2, 1, 990, 990),
(3, 3, 1, 19, 19),
(4, 4, 1, 40, 40),
(5, 5, 1, 81.30, 81.30),
(6, 6, 1, 7.50, 7.50),
(7, 1, 1, 990, 990),
(8, 5, 1, 990, 990),
(9, 6, 1, 7.50, 7.50);


--6
INSERT INTO
wishlist (
user_account_id,
product_id
)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(4, 5),
(3, 6),
(1, 3);

--7
INSERT INTO
review (
product_id,
user_account_id,
rating,
comment
)
VALUES
(1, 1, 5, 'good iPhone'),
(2, 2, 5, 'good Samsung'),
(3, 3, 5, 'good stuff'),
(4, 4, 5, 'tasty'),
(5, 1, 4, 'all right'),
(6, 3, 3, 'too late'),
(2, 2, 2, 'the time has come'),
(1, 4, 1, ' not so good iPhone');

--8
INSERT INTO
product_image (
product_id,
image_url
)
VALUES
(1, '~home/iPhone'),
(2, '~home/Samsung'),
(3, '~home/nike'),
(4, '~home/bread'),
(5, '~home/parfume'),
(6, '~home/lipstick');

