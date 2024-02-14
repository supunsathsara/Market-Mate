
-- USER TABLE
CREATE TABLE `marketmate`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(250) NULL,
  `email` VARCHAR(250) NOT NULL,
  `mobile` VARCHAR(45) NULL,
  `password` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);


-- PRODUCT TABLE
CREATE TABLE `marketmate`.`product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(75) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `image` VARCHAR(500) NOT NULL,
  `description` VARCHAR(2000) NOT NULL,
  `qty` INT NOT NULL,
  `added_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);


-- CART TABLE
CREATE TABLE `marketmate`.`cart` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `qty` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_car_user_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_cart_product_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `fk_cart_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `marketmate`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_cart_product`
    FOREIGN KEY (`product_id`)
    REFERENCES `marketmate`.`product` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- ORDER TABLE
CREATE TABLE `marketmate`.`order` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `customer_id` INT NOT NULL,
  `total` DECIMAL(10,2) NOT NULL,
  `orderDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_order_user_idx` (`customer_id` ASC) VISIBLE,
  CONSTRAINT `fk_order_user`
    FOREIGN KEY (`customer_id`)
    REFERENCES `marketmate`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- ORDER ITEM TABLE
CREATE TABLE `marketmate`.`order_item` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `product_qty` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_orderitem_order_idx` (`order_id` ASC) VISIBLE,
  INDEX `fk_orderitem_prodcut_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `fk_orderitem_order`
    FOREIGN KEY (`order_id`)
    REFERENCES `marketmate`.`order` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_orderitem_product`
    FOREIGN KEY (`product_id`)
    REFERENCES `marketmate`.`product` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
