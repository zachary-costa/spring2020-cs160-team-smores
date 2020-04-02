CREATE DATABASE testdb;
USE testdb;
CREATE TABLE IF NOT EXISTS `storages` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  description varchar(255) NOT NULL,
  published BOOLEAN DEFAULT false
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE IF NOT EXISTS `products` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  size int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE IF NOT EXISTS `storage_product` (
  storage_id INT NOT NULL,
  product_id INT NOT NULL,
  PRIMARY KEY(storage_id, product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;