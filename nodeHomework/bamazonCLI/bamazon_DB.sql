DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER auto_increment NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL(5, 2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Boomerang", "Toys", 25.00, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Basketball", "Toys", 55.00, 26);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Code names", "Games", 40.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Xbox One", "Electronics", 500.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gum", "Grocery", .99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bananas", "Grocery", .59, 67);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shorts", "Apparel", 19.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Desk", "Office", 250.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("17' Monitor", "Electronics", 150.00, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Zen Garden", "Office", 37.50, 15);