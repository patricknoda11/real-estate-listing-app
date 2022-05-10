CREATE DATABASE real_estate_simulation;

CREATE TABLE AppointmentRequestsRespondsR1 (
	agentEmail VARCHAR(80),
	apptType VARCHAR(80),
	location VARCHAR(80),
	duration INT,
	PRIMARY KEY(agentEmail, apptType)
);

CREATE TABLE AppointmentRequestsRespondsR2 (
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

CREATE TABLE AppointmentRequestsResponds(
    apptDate DATE,
    agentEmail VARCHAR(80),
    description VARCHAR(80),
    apptType VARCHAR(80),
    buyerEmail VARCHAR(80),
    timeOfDay TIME,
    PRIMARY KEY(agentEmail, buyerEmail, apptDate, timeOfDay),
    FOREIGN KEY (agentEmail, apptType) REFERENCES AppointmentRequestsRespondsR1(agentEmail, apptType)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (apptDate, agentEmail, buyerEmail) REFERENCES AppointmentRequestsRespondsR2(apptDate, agentEmail, buyerEmail)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (agentEmail) REFERENCES Agent(agentEmail)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (buyerEmail) REFERENCES Buyer(buyerEmail)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE ListingHas (
	listingAddress VARCHAR(80),
	agentEmail VARCHAR(80),
	price INT,
	PRIMARY KEY (listingAddress),
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
    FOREIGN KEY(listingAddress) REFERENCES ListingHas(listingAddress)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);