CREATE DATABASE real_estate_simulation;

CREATE TABLE Stager (
	stagerPhoneNumber BIGINT,
	stagerName VARCHAR(30),
	yearsExperience INT,
	PRIMARY KEY (stagerPhoneNumber)
);

CREATE TABLE Contracts (
	stagerPhoneNumber BIGINT,
	accId INT,
	PRIMARY KEY (stagerPhoneNumber, accId),
	FOREIGN KEY (stagerPhoneNumber) REFERENCES Stager(stagerPhoneNumber)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (accId) REFERENCES Agent(accId)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE ImageUploads (
	imageId VARCHAR(80),
	title VARCHAR(80),
	width INT, 
	height INT, 
	description VARCHAR(80),
	formatType VARCHAR(80),
	resolution INT,
	listingId INT,
	PRIMARY KEY (imageId),
	FOREIGN KEY (listingId) REFERENCES ListingOwnsHas (listingId)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (width, height) REFERENCES WidthHeight (width, height)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (formatType, resolution) REFERENCES FormatTypeResolution (formatType, resolution)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE WidthHeight (
	width INT,
	height INT,
	resolution INT,
	PRIMARY KEY(width, height)
);

CREATE TABLE FormatTypeResolution (
	formatType VARCHAR(80),
	resolution INT,
	quality VARCHAR(80),
	PRIMARY KEY (formatType, resolution)
);

CREATE TABLE ListingOwnsHas (
	listingId INT AUTO_INCREMENT,
	ownerPhoneNumber BIGINT NOT NULL,
	accId INT,
	price INT,
	PRIMARY KEY (listingId),
	FOREIGN KEY (ownerPhoneNumber) REFERENCES Owner (ownerPhoneNumber)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (accId) REFERENCES Agent(accId)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE Owner (
	ownerPhoneNumber BIGINT,
	ownerName VARCHAR(80),
	PRIMARY KEY (ownerPhoneNumber)
);

CREATE TABLE PropertyHas (
    listingId INT AUTO_INCREMENT NOT NULL, 
    location VARCHAR(80), 
    type VARCHAR(80),
    numberOfRooms INT, 
    numberOfBathrooms INT, 
    interiorSize INT,
    landSize INT,
    PRIMARY KEY(listingId, location),
    UNIQUE (listingId),
    FOREIGN KEY(listingId) REFERENCES ListingOwnsHas(listingId) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


CREATE TABLE Admin(
    adminId INT AUTO_INCREMENT,
    PRIMARY KEY(adminID)
);

CREATE TABLE ManageBuyers (
    adminId INT,
    buyerAcctId INT,
    PRIMARY KEY (adminId, buyerAcctId),
    FOREIGN KEY (adminID) REFERENCES Admin (adminId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (buyerAcctId) REFERENCES Buyer (accId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE ManageAgents (
    adminId INT,
    agentAcctId INT,
    PRIMARY KEY (adminId, agentAcctId),
    FOREIGN KEY (adminID) REFERENCES Admin (adminId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (agentAcctId) REFERENCES Buyer (accId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Buyer (
    accId INT AUTO_INCREMENT,
    phoneNumber BIGINT,
    email VARCHAR(80),
    password VARCHAR(80),
	name VARCHAR(80),
	birthday DATE,
    typePreference VARCHAR(80), 
    budget INT,
    PRIMARY KEY(accId),
    UNIQUE(phoneNumber),
    UNIQUE(email)
); 

CREATE TABLE Agent (
    accId INT AUTO_INCREMENT,
    phoneNumber BIGINT,
    email VARCHAR(80),
    password VARCHAR(80),
	name VARCHAR(80),
	birthday DATE,
    yearsExperience INT,
    preferredMeetingDuration INT,
    preferredInPersonMeetingLocation VARCHAR(80),
    PRIMARY KEY(accId),
    UNIQUE(phoneNumber),
    UNIQUE(email)
);

CREATE TABLE AppointmentRequestsResponds(
    apptDate DATE,
    agentAcctId INT, 
    description VARCHAR(80),
    apptType VARCHAR(80), 
    buyerAcctId INT, 
    timeOfDay TIME, 
    PRIMARY KEY(agentAcctId, buyerAcctId, apptDate, timeOfDay),
    FOREIGN KEY (agentAcctId, apptType) REFERENCES R1(agentAcctId, apptType)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (apptDate, agentAcctId, buyerAcctId) REFERENCES R2(apptDate, agentAcctId, buyerAcctId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (agentAcctId) REFERENCES Agent(accId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (buyerAcctId) REFERENCES Buyer(accId)
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);

CREATE TABLE R1 (
	agentAcctId INT,
	apptType VARCHAR(80), 
	location VARCHAR(80),
	duration INT,
	PRIMARY KEY(agentAcctId, apptType)
);

CREATE TABLE R2(
	apptDate DATE,
    agentAcctId INT,
    buyerAcctId INT,
    apptName VARCHAR(80),
    PRIMARY KEY(apptDate, agentAcctId, buyerAcctId)
);