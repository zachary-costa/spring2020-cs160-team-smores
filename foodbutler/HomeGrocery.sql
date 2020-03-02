/*
 * FoodButler Example Database
 *
 * Generate a database for three users with one frigerator and one shelf pantry.
 */

# Generate a homegroceries MySQL database if it does not exist.
# Then, enter database.
CREATE DATABASE homegroceries;
USE homegroceries;

# Storage Locations
CREATE TABLE storages {
    storage_id      INT signed NOT NULL AUTO_INCREMENT,
    storage_name    VARCHAR(60) NOT NULL,
    setup_date      DATE NOT NULL,
    temp_lowest     DOUBLE(5,2) unsigned NOT NULL, # lowest operating temperature in Celcius
    temp_highest    DOUBLE(5,2) unsigned NOT NULL, # highest operating temperature in Celcius
    PRIMARY ID      (storage_id, setup_date)
};

INSERT INTO storages (storage_id, storage_name, setup_date, temp_lowest, temp_highest) VALUES
    (1, 'Refrigerator', '2020-02-28', '-10.00', '20.00'),
    (2, 'Pantry', '2020-02-28', '0.00', '40.00');

# Grocery
CREATE TABLE grocery_products {
    grocery_id      INT signed NOT NULL AUTO_INCREMENT,
    storage_id      INT signed NOT NULL, # Where food is stored in home.
    product_name    VARCHAR(60) NOT NULL,
    category        VARCHAR(60) NOT NULL,
    quantity        INT signed NOT NULL,
    best_by_date    DATE, # If NULL, then no best-by-date was specified.
    PRIMARY ID      (grocery_id, storage_id)
};

INSERT INTO grocery_products (grocery_id, storage_id, product_name, category, quantity, best_by_date) VALUEs
    (1, 1, 'Apple', 'Fruits', 5, '2020-03-09'),
    (2, 1, 'Gallon Milk', 'Dairy', 1, '2020-03-01'),
    (3, 1, 'Tomato', 'Vegetable', 1, '2020-03-02'),
    (4, 1, 'Blueberry', 'Fruit', 2, '2020-03-10'),
    (5, 1, 'Steak', 'Poultry', 1, '2020-03-14'),
    (6, 1, 'Lettuce', 'Vegetable', 2, '2020-03-04'),
    (7, 1, 'Rice', 'Grains', 3, '2020-03-13'),
    (8, 2, 'Oatmeal', 'Grains', 3, NULL),
    (9, 2, 'Tortilla Chips', 'Grains', 2, '2022-3-1');

# Users who can access household FoodButler.
CREATE TABLE foodbutler_users {
    user_id         INT signed NOT NULL AUTO_INCREMENT,
    name            VARCHAR(150) NOT NULL,
    username        VARCHAR(150) NOT NULL,
    password        VARCHAR(150) NOT NULL,
    email_address   VARCHAR(150) NOT NULL,
    phone_number    INT signed,
    primary_owner   VARCHAR(150), # If NULL, then the user is the primary owner.
    PRIMARY ID      (id, email_address, primary_owner)
};

INSERT INTO foodbutler_users(id, name, username, password, email_address, phone_number, primary_owner) VALUES
    (1, 'Karen', 'karen39', 'ezpie', 'karen39@gmail.com', 5121234567, NULL),
    (2, 'Dave', 'dave18', 'whowhatwhere', 'davenator@gmail.com', 5121234568, 'karen39'),
    (3, 'John', 'john13', 'gamer4ever', 'eviljohn@gmail.com', NULL, 'karen39');

