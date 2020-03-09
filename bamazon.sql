DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;
CREATE TABLE products(
  id INTEGER NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2),
  stock_quantity INT,
  PRIMARY KEY(id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Xbox One", "Electronics", 300.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone", "Electronics", 1000.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("T-shirt", "Clothing", 20.00, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("jeans", "Clothing", 30.00, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("toothpaste", "Personal Care", 4.00, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cat food", "Pets", 15.00, 250);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bottled water", "Grocery", 1.00, 2000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Keurig", "Home Essentials", 150.00, 175);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("candle", "Home Essentials", 10.00, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("candy", "Grocery", 1.00, 500);

