CREATE DATABASE parkease;

CREATE TABLE user_role(
    role_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_type VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE "users"(
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
    role_id uuid,
    CONSTRAINT fk_role
        FOREIGN KEY(role_id) 
        REFERENCES user_role(role_id)
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

CREATE TABLE warden(
    warden_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    fname VARCHAR(100) NOT NULL,
    lname VARCHAR(100) NOT NULL,
    NIC VARCHAR(20) NOT NULL UNIQUE,
    profile_pic VARCHAR(255),
    age INT,
    gender VARCHAR(10),
    registration_code VARCHAR(100),
    user_id uuid, -- Change INT to UUID
    PMC_id uuid, -- Ensure this matches the type in the PMC table
    CONSTRAINT fk_user_warden
        FOREIGN KEY(user_id) 
        REFERENCES "users"(user_id),
    CONSTRAINT fk_PMC
        FOREIGN KEY(PMC_id) 
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
    tw_capacity INT,
    car_capacity INT,
    XLvehicle_capacity INT,
    full_capacity INT,
    PMC_id uuid, -- Change INT to UUID
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


CREATE TABLE vehicle_type(
    vehicle_type_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    type_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE vehicle(
    vehicle_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_number VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(255),
    type_id uuid, -- Change INT to UUID
    CONSTRAINT fk_vehicle_type
        FOREIGN KEY(type_id) 
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

CREATE TABLE slot_price (
    slot_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(50),
    amount_per_slot DECIMAL(10, 2)
);

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




