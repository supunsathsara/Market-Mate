
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
