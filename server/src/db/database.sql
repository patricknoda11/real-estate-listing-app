CREATE DATABASE real_estate_simulation;

CREATE TABLE AppointmentRequestsRespondsR1 (
	agentEmail VARCHAR(256),
	apptType VARCHAR(256),
	location VARCHAR(256),
	duration INT,
	PRIMARY KEY(agentEmail, apptType)
);

CREATE TABLE AppointmentRequestsRespondsR2 (
	apptDate DATE,
    agentEmail VARCHAR(256),
    buyerEmail VARCHAR(256),
    apptName VARCHAR(256),
    PRIMARY KEY(apptDate, agentEmail, buyerEmail)
);

CREATE TABLE Buyer (
    phoneNumber BIGINT,
    buyerEmail VARCHAR(256),
    password VARCHAR(256),
	name VARCHAR(256),
	birthday DATE,
    typePreference VARCHAR(256),
    budget INT,
    PRIMARY KEY(buyerEmail),
    UNIQUE(phoneNumber)
);

CREATE TABLE Agent (
    phoneNumber BIGINT,
    agentEmail VARCHAR(256),
    password VARCHAR(256),
	name VARCHAR(256),
	birthday DATE,
    yearsExperience INT,
    preferredMeetingDuration INT,
    preferredInPersonMeetingLocation VARCHAR(256),
    PRIMARY KEY(agentEmail),
    UNIQUE(phoneNumber)
);

CREATE TABLE AppointmentRequestsResponds(
    apptDate DATE,
    agentEmail VARCHAR(256),
    description VARCHAR(256),
    apptType VARCHAR(256),
    buyerEmail VARCHAR(256),
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
    id INT NOT NULL VARCHAR(36),
	listingAddress VARCHAR(256),
	agentEmail VARCHAR(256),
	price INT,
	PRIMARY KEY (id),
    UNIQUE (listingAddress),
	FOREIGN KEY (agentEmail) REFERENCES Agent(agentEmail)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE PropertyHas (
    listingId VARCHAR(36) NOT NULL,
    location VARCHAR(256),
    type VARCHAR(256),
    numberOfRooms INT,
    numberOfBathrooms INT,
    interiorSize INT,
    landSize INT,
    PRIMARY KEY(listingId, location),
    FOREIGN KEY(listingId) REFERENCES ListingHas(listingId)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE ImageHas (
    url: VARCHAR(2048) NOT NULL,
    listingId VARCHAR(36) NOT NULL,
    Primary Key (url),
    FOREIGN KEY (listingId) REFERENCES ListingHas(listingId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
