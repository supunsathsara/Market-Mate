
-- get a user by id
CREATE PROCEDURE getUserById (IN userId INT)
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE userIdValue INT;
    DECLARE userName VARCHAR(255);
    DECLARE userAddress VARCHAR(255);
    DECLARE userEmail VARCHAR(255);
    DECLARE userMobile VARCHAR(15);
    DECLARE userPassword VARCHAR(255);
    
    DECLARE cur CURSOR FOR 
        SELECT id, name, address, email, mobile, password
        FROM user
        WHERE id = userId;
        
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN cur;
    
    read_loop: LOOP
        FETCH cur INTO userIdValue, userName, userAddress, userEmail, userMobile, userPassword;
        IF done THEN
            LEAVE read_loop;
        END IF;
        SELECT userIdValue, userName, userAddress, userEmail, userMobile, userPassword;
    END LOOP;
    
    CLOSE cur;
END //



-- Add a product to the cart
DELIMITER //

CREATE PROCEDURE addToCart (IN productId INT, IN userEmail VARCHAR(255), IN quantity INT)
BEGIN
    DECLARE userId INT;
    DECLARE rowsAffected INT;
    
    -- Get the user ID based on the email
    SELECT id INTO userId
    FROM user
    WHERE email = userEmail;
    
    -- Try to update the existing row, if no row is updated, it means it doesn't exist, so insert a new one
    UPDATE cart
    SET qty = qty + quantity
    WHERE product_id = productId AND user_id = userId;
    
    -- Get the number of rows affected by the update
    SELECT ROW_COUNT() INTO rowsAffected;
    
    -- If no rows were updated, insert a new row
    IF rowsAffected = 0 THEN
        INSERT INTO cart (user_id, product_id, qty)
        VALUES (userId, productId, quantity);
    END IF;
END //

DELIMITER ;


-- Get cart items by email
CREATE PROCEDURE getCartItemsByEmail (IN userEmail VARCHAR(255))
BEGIN
    DECLARE userId INT;
    
    -- Get the user ID based on the email
    SELECT id INTO userId
    FROM user
    WHERE email = userEmail;
    
    -- Select cart items along with product details and calculate total price for each item
    SELECT 
        c.id AS cart_id,
        p.id AS product_id,
        p.title AS product_title,
        p.price AS unit_price,
        c.qty AS quantity,
        (p.price * c.qty) AS total_price,
        p.image AS product_image,
        p.description AS product_description
    FROM cart c
    INNER JOIN product p ON c.product_id = p.id
    WHERE c.user_id = userId;
END //



DELIMITER //

CREATE PROCEDURE checkout (IN userEmail VARCHAR(255), IN total DECIMAL(10,2), IN address VARCHAR(500), IN mobile VARCHAR(20))
BEGIN
    DECLARE customerId INT;
    DECLARE orderId INT;
    
    -- Get the customer ID based on the email
    SELECT id INTO customerId
    FROM user
    WHERE email = userEmail;
    
    -- Add the order to the order table
    INSERT INTO `order` (customer_id, total, address, mobile)
    VALUES (customerId, total, address, mobile);
    
    -- Get the ID of the last inserted order
    SET orderId = LAST_INSERT_ID();
    
    -- Insert order items from the cart table
    INSERT INTO order_item (order_id, product_id, product_qty)
    SELECT orderId, product_id, qty
    FROM cart
    WHERE user_id = customerId;
    
    -- Remove items from the cart table
    DELETE FROM cart
    WHERE user_id = customerId;
END //

DELIMITER ;