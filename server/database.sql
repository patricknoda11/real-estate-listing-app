CREATE DATABASE real_estate_simulation;

CREATE TABLE Stager (
	stagerPhoneNumber BIGINT,
	stagerName VARCHAR(30),
	yearsExperience INT,
	PRIMARY KEY (stagerPhoneNumber)
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

CREATE TABLE Owner (
	ownerPhoneNumber BIGINT,
	ownerName VARCHAR(80),
	PRIMARY KEY (ownerPhoneNumber)
);


CREATE TABLE Admin(
    adminId INT AUTO_INCREMENT,
    PRIMARY KEY(adminID)
);

CREATE TABLE R1 (
	agentEmail VARCHAR(80),
	apptType VARCHAR(80), 
	location VARCHAR(80),
	duration INT,
	PRIMARY KEY(agentEmail, apptType)
);

CREATE TABLE R2(
	apptDate DATE,
    agentEmail VARCHAR(80),
    buyerEmail VARCHAR(80),
    apptName VARCHAR(80),
    PRIMARY KEY(apptDate, agentEmail, buyerEmail)
);

CREATE TABLE Buyer (
    phoneNumber BIGINT,
    buyerEmail VARCHAR(80),
    password VARCHAR(80),
	name VARCHAR(80),
	birthday DATE,
    typePreference VARCHAR(80), 
    budget INT,
    PRIMARY KEY(buyerEmail),
    UNIQUE(phoneNumber)
); 

CREATE TABLE Agent (
    phoneNumber BIGINT,
    agentEmail VARCHAR(80),
    password VARCHAR(80),
	name VARCHAR(80),
	birthday DATE,
    yearsExperience INT,
    preferredMeetingDuration INT,
    preferredInPersonMeetingLocation VARCHAR(80),
    PRIMARY KEY(agentEmail),
    UNIQUE(phoneNumber)
);

CREATE TABLE Contracts (
	stagerPhoneNumber BIGINT,
	agentEmail VARCHAR(80),
	PRIMARY KEY (stagerPhoneNumber, agentEmail),
	FOREIGN KEY (stagerPhoneNumber) REFERENCES Stager(stagerPhoneNumber)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (agentEmail) REFERENCES Agent(agentEmail)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE AppointmentRequestsResponds(
    apptDate DATE,
    agentEmail VARCHAR(80), 
    description VARCHAR(80),
    apptType VARCHAR(80), 
    buyerEmail VARCHAR(80), 
    timeOfDay TIME, 
    PRIMARY KEY(agentEmail, buyerEmail, apptDate, timeOfDay),
    FOREIGN KEY (agentEmail, apptType) REFERENCES R1(agentEmail, apptType)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (apptDate, agentEmail, buyerEmail) REFERENCES R2(apptDate, agentEmail, buyerEmail)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (agentEmail) REFERENCES Agent(agentEmail)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (buyerEmail) REFERENCES Buyer(buyerEmail)
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);

CREATE TABLE ManageBuyers (
    adminId INT,
    buyerEmail VARCHAR(80),
    PRIMARY KEY (adminId, buyerEmail),
    FOREIGN KEY (adminID) REFERENCES Admin (adminId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (buyerEmail) REFERENCES Buyer (buyerEmail)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE ManageAgents (
    adminId INT,
    agentEmail VARCHAR(80),
    PRIMARY KEY (adminId, agentEmail),
    FOREIGN KEY (adminID) REFERENCES Admin (adminId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (agentEmail) REFERENCES Agent (agentEmail)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE ListingOwnsHas (
	listingAddress VARCHAR(80),
	ownerPhoneNumber BIGINT NOT NULL,
	agentEmail VARCHAR(80),
	price INT,
	PRIMARY KEY (listingAddress),
	FOREIGN KEY (ownerPhoneNumber) REFERENCES Owner(ownerPhoneNumber)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (agentEmail) REFERENCES Agent(agentEmail)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE PropertyHas (
    listingAddress VARCHAR(80) NOT NULL, 
    location VARCHAR(80), 
    type VARCHAR(80),
    numberOfRooms INT, 
    numberOfBathrooms INT, 
    interiorSize INT,
    landSize INT,
    PRIMARY KEY(listingAddress, location),
    UNIQUE (listingAddress),
    FOREIGN KEY(listingAddress) REFERENCES ListingOwnsHas(listingAddress) 
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
	listingAddress VARCHAR(80),
	PRIMARY KEY (imageId),
	FOREIGN KEY (listingAddress) REFERENCES ListingOwnsHas (listingAddress)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (width, height) REFERENCES WidthHeight (width, height)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (formatType, resolution) REFERENCES FormatTypeResolution (formatType, resolution)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);