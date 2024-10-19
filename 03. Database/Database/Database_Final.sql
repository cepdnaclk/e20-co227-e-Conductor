// USERS TABLE
CREATE TABLE USERS (
      UserID int(7) NOT NULL AUTO_INCREMENT,
      UserType varchar(10) NOT NULL,
      empType varchar(10) NOT NULL,
      fName varchar(20) NOT NULL,
      lName varchar(20) NOT NULL,
      email varchar(50) NOT NULL UNIQUE,
      mobile varchar(12) NOT NULL UNIQUE,
      nic varchar(12),
      birthday DATE,
      ntc varchar(10),
      licence varchar(15),
      accName varchar(15),
      accNo varchar(20),
      bank varchar(20),
      branch varchar(20),
      credits DECIMAL(6,2),
      userState varchar(10) NOT NULL,
      PRIMARY KEY (UserID)
);


// USERS_LOG
CREATE TABLE USER_LOGS (
      logID INT AUTO_INCREMENT NOT NULL UNIQUE,
      userID INT NOT NULL,
      device VARCHAR(10) NOT NULL,
      OS VARCHAR(15) NOT NULL,
      browser VARCHAR(15) NOT NULL,
      MAC VARCHAR(18) NOT NULL,
      IP VARCHAR(40) NOT NULL,
      date VARCHAR(20) NOT NULL,
      time VARCHAR(15) NOT NULL,
      country VARCHAR(20) NOT NULL,
      PRIMARY KEY (userID, MAC, browser)
);

// OTP_TABLE
CREATE TABLE OTP_TABLE (
      otpID int(11) NOT NULL AUTO_INCREMENT,
      otp varchar(6) NOT NULL,
      contactNo varchar(12),
      email varchar(50),
      PRIMARY KEY(otpID)
);

// BUSSTOP_NAMES
CREATE TABLE BUSSTOP_NAMES(
        nameID INT PRIMARY KEY,
        name VARCHAR(150),
        lng DECIMAL(21,18),
        lat DECIMAL(21,18)
);

// BUSSTOPS_LOCATIONS
CREATE TABLE BUSSTOP_LOCATIONS(
        locationID INT PRIMARY KEY,
        nameID INT(5),
        lat DECIMAL(21,18),
        lng DECIMAL(21,18),
        routes JSON,
        FOREIGN KEY (nameID) REFERENCES BUSSTOP_NAMES(nameID)    
);

// ROUTES
CREATE TABLE ROUTE (
      routeID int NOT NULL AUTO_INCREMENT,
      routeNo varchar(10) NOT NULL,
      routeType varchar(12) NOT NULL,
      start varchar(25) NOT NULL,
      end varchar(25) NOT NULL,
      PRIMARY KEY (routeID)
);

// ADMIN
CREATE TABLE ADMIN(
      adminID INT AUTO_INCREMENT NOT NULL UNIQUE,
      userName VARCHAR(20) NOT NULL UNIQUE,
      password VARCHAR(20) NOT NULL,
      fName VARCHAR(20) NOT NULL,
      lName VARCHAR(20) NOT NULL,
      ecoID VARCHAR(25) NOT NULL UNIQUE,
      email VARCHAR(50) NOT NULL UNIQUE,
      mobile VARCHAR(12) NOT NULL UNIQUE
);

// VEHICLE
CREATE TABLE VEHICLE (
        vehicleID INT NOT NULL AUTO_INCREMENT,
        vehicleRegNo VARCHAR(10) NOT NULL UNIQUE,
        ownerID INT NOT NULL,
        ntcRegNo VARCHAR(10) NOT NULL UNIQUE,
        seats INT(2) NOT NULL,
        serviceType VARCHAR(20) NOT NULL,
        org VARCHAR(20) NOT NULL,
        PRIMARY KEY (vehicleID),
        FOREIGN KEY (ownerID) REFERENCES USERS(userID)
);    

// SCHEDULE
CREATE TABLE SCHEDULE (
    scheduleID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    vehicleID INT(10) NOT NULL,
    routeID INT(10) NOT NULL,
    date VARCHAR(12) NOT NULL,
    departureTime VARCHAR(10) NOT NULL,
    arrivalTime VARCHAR(10) NOT NULL,
    closingDate VARCHAR(12) NOT NULL,
    driverID INT(8) NOT NULL,
    conductorID INT(8) NOT NULL,
    bookedSeats JSON,
    FOREIGN KEY (vehicleID) REFERENCES VEHICLE(vehicleID),
    FOREIGN KEY (routeID) REFERENCES ROUTE(routeID),
    FOREIGN KEY (driverID) REFERENCES USERS(userID),
    FOREIGN KEY (conductorID) REFERENCES USERS(userID)
);


// TRANSACTION
CREATE TABLE TRANSACTION (
    transactionID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    userID INT NOT NULL,
    amount DECIMAL(6,2) NOT NULL,
    date VARCHAR(12) NOT NULL,
    time VARCHAR(12) NOT NULL,
    refNo VARCHAR(50),
    type VARCHAR(50),
    status VARCHAR(20),
    bankAccountNumber VARCHAR(50),
    accountBranch VARCHAR(50),
    beneficiary VARCHAR(50),
    bank VARCHAR(30),
    FOREIGN KEY (userID) REFERENCES USERS(userID)
);

// BUS_LOCATIONS
CREATE TABLE BUS_LOCATIONS (
      id INT AUTO_INCREMENT PRIMARY KEY,
      regNo VARCHAR(10) NOT NULL,
      lat DECIMAL(21, 18) NOT NULL,
      lng DECIMAL(21, 18) NOT NULL,
      speed FLOAT NOT NULL
);

// ACTIVITY
CREATE TABLE ACTIVITY (
      activityID INT AUTO_INCREMENT PRIMARY KEY, 
      vehicleID INT NOT NULL, 
      ownerID INT NOT NULL, 
      date VARCHAR(11) NOT NULL, 
      rides INT DEFAULT 0, 
      canceled INT DEFAULT 0, 
      replaced INT DEFAULT 0, 
      bookings INT DEFAULT 0, 
      refund INT DEFAULT 0, 
      receivedMoney DECIMAL(10, 2) DEFAULT 0.00, 
      refundMoney DECIMAL(10, 2) DEFAULT 0.00, 
      earning DECIMAL(10, 2) DEFAULT 0.00, 
      FOREIGN KEY (vehicleID) REFERENCES VEHICLE(vehicleID), 
      FOREIGN KEY (ownerID) REFERENCES USERS(userID)
);
