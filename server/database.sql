CREATE DATABASE parkease;

-- CREATE TABLE user_role(
--     role_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
--     role_type VARCHAR(50) NOT NULL UNIQUE
-- );

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    addressNo VARCHAR(50),
    street_1 VARCHAR(255),
    street_2 VARCHAR(255),
    city VARCHAR(100),
    province VARCHAR(100),
    isVerified BOOLEAN DEFAULT FALSE,
    verification_code VARCHAR(100),
    role_id INT
);

CREATE TABLE user_contactno (
    contactNo VARCHAR(20) NOT NULL,
    user_id uuid,
    PRIMARY KEY (contactNo, user_id),
    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES "users"(user_id)
);

CREATE TABLE pmc(
    pmc_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    regNo VARCHAR(100) NOT NULL UNIQUE,
    user_id uuid,
    CONSTRAINT fk_user_PMC
        FOREIGN KEY(user_id) 
        REFERENCES "users"(user_id)
);

CREATE TABLE warden (
    warden_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    fname VARCHAR(100) NOT NULL,
    lname VARCHAR(100) NOT NULL,
    NIC VARCHAR(20) NOT NULL UNIQUE,
    profile_pic VARCHAR(255),
    age INT,
    gender VARCHAR(10),
    registration_code VARCHAR(100),
    user_id uuid,
    PMC_id uuid,
    is_assigned BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_user_warden
        FOREIGN KEY (user_id) 
        REFERENCES users(user_id),
    CONSTRAINT fk_PMC
        FOREIGN KEY (PMC_id) 
        REFERENCES PMC(PMC_id)
);



CREATE TABLE driver(
    driver_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    fname VARCHAR(100) NOT NULL,
    lname VARCHAR(100) NOT NULL,
    NIC VARCHAR(20) NOT NULL UNIQUE,
    age INT,
    gender VARCHAR(10),
    profile_pic VARCHAR(255),
    user_id uuid,
    CONSTRAINT fk_user_driver
        FOREIGN KEY(user_id) 
        REFERENCES "users"(user_id)
);

CREATE TABLE parking_lot(
    lot_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    bike_capacity INT,
    -- tw_capacity INT,
    car_capacity INT,
    -- XLvehicle_capacity INT,
    full_capacity INT,
    PMC_id uuid, -- Change INT to UUID
    addressNo VARCHAR(50),
    street_1 VARCHAR(255),
    street_2 VARCHAR(255),
    city VARCHAR(255),
    district VARCHAR(255),
    CONSTRAINT fk_PMC_parking_lot
        FOREIGN KEY(PMC_id) 
        REFERENCES PMC(PMC_id)
);


CREATE TABLE warden_parking_lot(
    warden_id uuid, -- Change INT to UUID
    lot_id uuid, -- Change INT to UUID
    assigned_date DATE,
    assigned_time TIME,
    PRIMARY KEY (warden_id, lot_id),
    CONSTRAINT fk_warden
        FOREIGN KEY(warden_id) 
        REFERENCES warden(warden_id),
    CONSTRAINT fk_parking_lot
        FOREIGN KEY(lot_id) 
        REFERENCES parking_lot(lot_id)
);


CREATE TABLE vehicle_type (
    vehicle_type_id INT PRIMARY KEY,
    type_name VARCHAR(50) NOT NULL UNIQUE
);

-- Insert multiple entries into the vehicle_type table
-- INSERT INTO vehicle_type (type_name) VALUES
-- ('Bicycle'),
-- ('Bike'),
-- ('Bus'),
-- ('Car'),
-- ('Concrete Mixer'),
-- ('Container Truck'),
-- ('Fire Engine'),
-- ('Fork Lift'),
-- ('Jeep'),
-- ('Lorry'),
-- ('Pick Up'),
-- ('SUV'),
-- ('Tractor'),
-- ('TukTuk'),
-- ('Van');

CREATE TABLE vehicle (
    vehicle_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_number VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(255),
    type_id INT,
    CONSTRAINT fk_vehicle_type
        FOREIGN KEY (type_id) 
        REFERENCES vehicle_type(vehicle_type_id)
);


CREATE TABLE driver_vehicle (
    driver_vehicle_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    driver_id uuid,
    vehicle_id uuid,
    CONSTRAINT fk_driver
        FOREIGN KEY(driver_id) 
        REFERENCES driver(driver_id),
    CONSTRAINT fk_vehicle
        FOREIGN KEY(vehicle_id) 
        REFERENCES vehicle(vehicle_id)
);

CREATE TABLE payment_method (
    method_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE transaction (
    transaction_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    time TIME NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    method_id uuid,
    CONSTRAINT fk_payment_method
        FOREIGN KEY(method_id) 
        REFERENCES payment_method(method_id)
);

CREATE TABLE parking_instance (
    instance_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    in_time TIMESTAMP NOT NULL,
    out_time TIMESTAMP,
    toll_amount DECIMAL(10, 2),
    transaction_id uuid,
    driver_vehicle_id uuid,
    slot_id uuid,
    lot_id uuid,
    warden_id uuid,
    CONSTRAINT fk_transaction
        FOREIGN KEY(transaction_id) 
        REFERENCES transaction(transaction_id),
    CONSTRAINT fk_driver_vehicle
        FOREIGN KEY(driver_vehicle_id) 
        REFERENCES driver_vehicle(driver_vehicle_id),
    CONSTRAINT fk_parking_lot
        FOREIGN KEY(lot_id) 
        REFERENCES parking_lot(lot_id),
    CONSTRAINT fk_warden
        FOREIGN KEY(warden_id) 
        REFERENCES warden(warden_id)
);

-- CREATE TABLE slot_price (
--     slot_id INT PRIMARY KEY,
--     type VARCHAR(50) NOT NULL,
--     amount_per_slot DECIMAL(10, 2) NOT NULL
-- );

CREATE TABLE parkpoints (
    parkpoint_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    no_of_points INT,
    driver_id uuid, -- Change INT to UUID
    CONSTRAINT fk_driver_parkpoints
        FOREIGN KEY(driver_id) 
        REFERENCES driver(driver_id)
);


CREATE TABLE card (
    card_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    card_name VARCHAR(100),
    card_number VARCHAR(20) NOT NULL UNIQUE,
    expiration_date DATE,
    CVV VARCHAR(4),
    driver_id uuid,
    CONSTRAINT fk_driver_card
        FOREIGN KEY(driver_id) 
        REFERENCES driver(driver_id)
);

CREATE TABLE payparkwallet (
    wallet_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    available_amount DECIMAL(10, 2),
    driver_id uuid,
    CONSTRAINT fk_driver_wallet
        FOREIGN KEY(driver_id) 
        REFERENCES driver(driver_id)
);

CREATE TABLE cash (
    cash_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    warden_id uuid,
    CONSTRAINT fk_warden_cash
        FOREIGN KEY(warden_id) 
        REFERENCES warden(warden_id)
);

CREATE TABLE administrator (
    admin_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid,
    CONSTRAINT fk_user_admin
        FOREIGN KEY(user_id) 
        REFERENCES "users"(user_id)
);

-- New tables

CREATE TABLE ParkingLotReviews (
    id SERIAL PRIMARY KEY,
    driver_id UUID NOT NULL,
    lot_id UUID NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (driver_id) REFERENCES driver(driver_id),
    FOREIGN KEY (lot_id) REFERENCES parking_lot(lot_id)
);


-- CREATE TABLE ParkingLotReviews (
--      id SERIAL PRIMARY KEY,
--      driver_id UUID NOT NULL,
--      lot_id UUID NOT NULL,
--      rating INT CHECK (rating >= 1 AND rating <= 5),
--      review TEXT,
--      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--      FOREIGN KEY (driver_id) REFERENCES driver(driver_id),
--      FOREIGN KEY (parking_lot_id) REFERENCES parking_lot(lot_id)
-- );

--Alter queries

ALTER TABLE vehicle ADD COLUMN isparked BOOLEAN DEFAULT FALSE;

ALTER TABLE driver ADD COLUMN isparked BOOLEAN DEFAULT FALSE;

ALTER TABLE parking_lot ADD COLUMN status VARCHAR(50) DEFAULT 'active';
--important inactive status is == "Inactive" not inactive

ALTER TABLE parking_lot ADD COLUMN description VARCHAR(255);

ALTER TABLE vehicle ADD COLUMN isdeleted BOOLEAN DEFAULT FALSE;

ALTER TABLE driver ADD COLUMN description TEXT;

ALTER TABLE parking_instance
ADD COLUMN iscompleted BOOLEAN;

ALTER TABLE users ADD COLUMN contact VARCHAR(10);

ALTER TABLE parking_lot DROP COLUMN street_1;
ALTER TABLE parking_lot DROP COLUMN street_2;
ALTER TABLE parking_lot ADD COLUMN street1 VARCHAR(255);
ALTER TABLE parking_lot ADD COLUMN street2 VARCHAR(255);

ALTER TABLE parking_lot DROP COLUMN location;

ALTER TABLE warden DROP COLUMN is_assigned;
ALTER TABLE warden ADD COLUMN isassigned BOOLEAN DEFAULT FALSE;

INSERT INTO vehicle_type (vehicle_type_id, type_name) VALUES (1, 'Car');
INSERT INTO vehicle_type (vehicle_type_id, type_name) VALUES (2, 'Bike');
INSERT INTO vehicle_type (vehicle_type_id, type_name) VALUES (3, 'ThreeWheeler');
INSERT INTO vehicle_type (vehicle_type_id, type_name) VALUES (4, 'Large Vehicle');

--calculate full_capacity
-- Create the trigger function
-- CREATE OR REPLACE FUNCTION calculate_full_capacity() 
-- RETURNS TRIGGER AS $$
-- BEGIN
--     NEW.full_capacity := COALESCE(NEW.bike_capacity, 0) + 
--                          COALESCE(NEW.car_capacity, 0); 
--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- Create the trigger
-- CREATE TRIGGER set_full_capacity
-- BEFORE INSERT OR UPDATE ON parking_lot
-- FOR EACH ROW
-- EXECUTE FUNCTION calculate_full_capacity();

-- INSERT INTO slot_price (slot_id, type, amount_per_slot)
-- VALUES
--   (1, 'bike', 30.00),
--   (2, 'tw', 50.00),
--   (3, 'car', 70.00),
--   (4, 'lorry', 100.00);

ALTER TABLE parking_lot
ADD COLUMN sketch VARCHAR(255),
ADD COLUMN images JSON;

CREATE TABLE toll_amount (
    lot_id UUID,
    type_id INT,
    amount_per_vehicle DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (lot_id, type_id),
    FOREIGN KEY (lot_id) REFERENCES parking_lot(lot_id)
);

--Card types table
CREATE TABLE card_type (
    card_type_id INT PRIMARY KEY,
    card_type VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO card_type (card_type_id, card_type) VALUES (1, 'Visa');
INSERT INTO card_type (card_type_id, card_type) VALUES (2, 'MasterCard');

--New card table
CREATE TABLE card (
    card_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    card_name VARCHAR(100),
    card_number VARCHAR(20) NOT NULL UNIQUE,
    expiration_date DATE,
    CVV VARCHAR(4),
    driver_id uuid,
    CONSTRAINT fk_driver_card
        FOREIGN KEY(driver_id) 
        REFERENCES driver(driver_id),
    type_id INT,
    CONSTRAINT fk_type_card
        FOREIGN KEY(type_id)
        REFERENCES card_type(card_type_id)
);

--Driver's card details
CREATE TABLE driver_card (
    driver_card_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    driver_id uuid,
    card_id uuid,
    CONSTRAINT fk_driver
        FOREIGN KEY(driver_id) 
        REFERENCES driver(driver_id),
    CONSTRAINT fk_card
        FOREIGN KEY(card_id) 
        REFERENCES card(card_id)
);

ALTER TABLE pmc
ADD COLUMN sector VARCHAR(50),
ADD COLUMN cmc VARCHAR(100);

ALTER TABLE pmc
ADD COLUMN registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

CREATE TABLE wardenreviews (
    id SERIAL PRIMARY KEY,
    driver_id UUID NOT NULL,
    warden_id UUID NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (driver_id) REFERENCES driver(driver_id),
    FOREIGN KEY (warden_id) REFERENCES warden(warden_id)
);


ALTER TABLE parking_lot
ADD COLUMN link VARCHAR(255);


-- Notification Table new ---------> Drop the previous notification table and create this -------------------------------------------------------------------- 

CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    receiver_id UUID NOT NULL,
    sender_id UUID DEFAULT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE,
    role_id INTEGER DEFAULT NULL,
    CONSTRAINT notifications_receiver_id_fkey FOREIGN KEY (receiver_id) REFERENCES users (user_id) ON DELETE CASCADE,
    CONSTRAINT notifications_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES users (user_id) ON DELETE SET NULL
);


ALTER TABLE notifications
ADD COLUMN target_route TEXT DEFAULT NULL;


INSERT INTO payment_method (method_id, name)
VALUES (4, 'Released') 
ON CONFLICT (method_id) DO NOTHING;
-------------------------------------------- payment
-- remove method_id from transaction table
ALTER TABLE transaction
DROP COLUMN method_id;


ALTER TABLE transaction
ADD COLUMN pmc_id UUID,
ADD CONSTRAINT fk_pmc_id
FOREIGN KEY (pmc_id) REFERENCES pmc(pmc_id);

-- Add driver_id column (references driver table's primary key)
ALTER TABLE transaction
ADD COLUMN driver_id UUID,
ADD CONSTRAINT fk_driver_id
FOREIGN KEY (driver_id) REFERENCES driver(driver_id);

ALTER TABLE transaction
ADD COLUMN admin BOOLEAN DEFAULT FALSE;

ALTER TABLE warden ADD COLUMN created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Remove the 'description' and 'profile_pic' columns
ALTER TABLE driver
DROP COLUMN description,
DROP COLUMN profile_pic;

-- Add 'registered_at' column to store registration date (timestamp with time zone)
ALTER TABLE driver
ADD COLUMN registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Add 'account_status' column with default value 'active'
ALTER TABLE driver
ADD COLUMN account_status character varying(20) DEFAULT 'active';


ALTER TABLE parking_lot
ADD COLUMN latitude DECIMAL(10, 6),
ADD COLUMN longitude DECIMAL(10, 6);


ALTER TABLE parking_lot
ADD COLUMN car_capacity_available INT,
ADD COLUMN bike_capacity_available INT;
