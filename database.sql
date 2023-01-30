CREATE DATABASE coffeeshop_management;

CREATE TABLE coffee_shop (
    coffee_shop_id SERIAL UNIQUE,
    coffee_shop_name varchar(45) DEFAULT 'The Coffee House',
    coffee_shop_address varchar(45) DEFAULT NULL,
    coffee_shop_phone_number varchar(45) DEFAULT NULL,
    PRIMARY KEY (coffee_shop_id )
);


CREATE TABLE employee (
    employee_id SERIAL,
    employee_position varchar(45) DEFAULT NULL,
    employee_name varchar(45) DEFAULT NULL,
    employee_phone_number varchar(45) DEFAULT NULL,
    coffee_shop_id int,
    PRIMARY KEY ( employee_id ),
    CONSTRAINT FK_employee_coffee_shop FOREIGN KEY (coffee_shop_id) REFERENCES coffee_shop(coffee_shop_id)
);

CREATE TABLE product_type(
    product_type_id SERIAL,
    product_type_name varchar(45) DEFAULT NULL,
    PRIMARY KEY (product_type_id)
);

CREATE TABLE product (
    product_id SERIAL,
    product_name varchar(45) DEFAULT NULL,
    product_price decimal(10,0) DEFAULT NULL,
    product_type_id int,
    PRIMARY KEY (product_id),
    CONSTRAINT FK_product_product_type FOREIGN KEY (product_type_id) REFERENCES product_type(product_type_id)
);

CREATE TABLE inventory (
	product_id int,
	coffee_shop_id int,
	quantity int,
	
	PRIMARY KEY (product_id,coffee_shop_id),
	CONSTRAINT FK_inventory_coffee_shop FOREIGN KEY (coffee_shop_id) REFERENCES coffee_shop(coffee_shop_id),
	CONSTRAINT FK_inventory_product FOREIGN KEY (product_id) REFERENCES product(product_id)	
);

CREATE TABLE customer(
    customer_id SERIAL,
    customer_name varchar(45) DEFAULT NULL,
    customer_address varchar(255) DEFAULT NULL,
    customer_phone varchar(45) DEFAULT NULL,
    PRIMARY KEY (customer_id)
);

CREATE TABLE payment_type(
    payment_type_id SERIAL,
    payment_type_description varchar(45) DEFAULT NULL,
    PRIMARY KEY (payment_type_id)
);

CREATE TABLE orders(
    order_id SERIAL,
    order_date TIMESTAMP DEFAULT CURRENT_DATE, 
    order_quantity int DEFAULT NULL,
    product_id int,
    coffee_shop_id int,
    customer_id int,
    payment_type_id int,

    PRIMARY KEY (order_id),
    CONSTRAINT FK_orders_product FOREIGN KEY (product_id) REFERENCES product(product_id),
    CONSTRAINT FK_orders_coffee_shop FOREIGN KEY (coffee_shop_id ) REFERENCES coffee_shop(coffee_shop_id ),
    CONSTRAINT FK_orders_payment_type FOREIGN KEY ( payment_type_id ) REFERENCES payment_type( payment_type_id),
    CONSTRAINT FK_orders_customer  FOREIGN KEY (customer_id ) REFERENCES customer(customer_id)
);

