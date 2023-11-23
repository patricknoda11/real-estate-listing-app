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

-- Test data Agent:
--
INSERT INTO Agent (phoneNumber, agentEmail, password, name, birthday, yearsExperience, preferredMeetingDuration, preferredInPersonMeetingLocation) VALUES (6046547895, 'romeolink@gmail.com', '!@#!$123', 'Romeo', '1997-05-28', 3, 30, 'Richmond, BC');

INSERT INTO Agent (phoneNumber, agentEmail, password, name, birthday, yearsExperience, preferredMeetingDuration, preferredInPersonMeetingLocation) VALUES (7789897546, 'Samvolk@gmail.com', '!@#!$123', 'Sam Volk', '1996-09-01', 6, 30, 'Burnaby, BC');

INSERT INTO Agent (phoneNumber, agentEmail, password, name, birthday, yearsExperience, preferredMeetingDuration, preferredInPersonMeetingLocation) VALUES (6045692134, 'williamvengence@gmail.com', '1234123', 'William Vengence', '1989-09-08', 8, 60, 'Vancouver, BC');

INSERT INTO Agent (phoneNumber, agentEmail, password, name, birthday, yearsExperience, preferredMeetingDuration, preferredInPersonMeetingLocation) VALUES (7789453794, 'shanyasmith@gmail.com', 'shanyay901', 'Shanya Smith', '2001-03-22', 2, 45, 'Chilliwack, BC');

INSERT INTO Agent (phoneNumber, agentEmail, password, name, birthday, yearsExperience, preferredMeetingDuration, preferredInPersonMeetingLocation) VALUES (2086457821, 'killianhayes@gmail.com', 'killian1901', 'Killian Hayes', '1995-01-02', 5, 60, 'Edmonton, AB');

-- Test data ListingHas
--
INSERT INTO ListingHas (listingAddress, agentEmail, price) VALUES ('89762 89 st', 'patricknoda11@gmail.com', 200000);

INSERT INTO ListingHas (listingAddress, agentEmail, price) VALUES ('01972 demko ave', 'patricknoda11@gmail.com', 800000);

INSERT INTO ListingHas (listingAddress, agentEmail, price) VALUES ('12109 albert st', 'patricknoda11@gmail.com', 300000);

INSERT INTO ListingHas (listingAddress, agentEmail, price) VALUES ('81921 broadway st', 'emmasmith@gmail.com', 700000);

INSERT INTO ListingHas (listingAddress, agentEmail, price) VALUES ('29292 livingston st', 'emmasmith@gmail.com', 1100000);

INSERT INTO ListingHas (listingAddress, agentEmail, price) VALUES ('13418 45 st', 'emmasmith@gmail.com', 890000);

INSERT INTO ListingHas (listingAddress, agentEmail, price) VALUES ('59678 fairmont st', 'killianhayes@gmail.com', 150000);

INSERT INTO ListingHas (listingAddress, agentEmail, price) VALUES ('90800 hive st', 'killianhayes@gmail.com', 2300000);

INSERT INTO ListingHas (listingAddress, agentEmail, price) VALUES ('12345 smoothdrive st', 'kimberly@gmail.com', 780000);

INSERT INTO ListingHas (listingAddress, agentEmail, price) VALUES ('56482 walnut ave', 'samturner@gmail.com', 200000);

INSERT INTO ListingHas (listingAddress, agentEmail, price) VALUES ('16458 horshoe ave', 'samturner@gmail.com', 560000);

INSERT INTO ListingHas (listingAddress, agentEmail, price) VALUES ('89754 snow ave', 'samturner@gmail.com', 888888);

INSERT INTO ListingHas (listingAddress, agentEmail, price) VALUES ('45687 lemon ave', 'samturner@gmail.com', 369000);

INSERT INTO ListingHas (listingAddress, agentEmail, price) VALUES ('54672 cool st', 'taro@gmail.com', 965000);

INSERT INTO ListingHas (listingAddress, agentEmail, price) VALUES ('15462 curry st', 'taro@gmail.com', 987200);

INSERT INTO ListingHas (listingAddress, agentEmail, price) VALUES ('12398 stone ave', 'williamvengence@gmail.com', 369000);

INSERT INTO ListingHas (listingAddress, agentEmail, price) VALUES ('12457 hare ave', 'shanyasmith@gmail.com', 500000);

-- Test data PropertyHas
INSERT INTO PropertyHas (listingAddress, location, type, numberOfRooms, numberOfBathrooms, interiorSize, landSize) VALUES ('89762 89 st', 'Squamish, BC', 'House', 4, 3, 7800, 9000);

INSERT INTO PropertyHas (listingAddress, location, type, numberOfRooms, numberOfBathrooms, interiorSize, landSize) VALUES ('01972 demko ave', 'North Vancouver, BC', 'Apartment', 2, 1, 2100, 2200);

INSERT INTO PropertyHas (listingAddress, location, type, numberOfRooms, numberOfBathrooms, interiorSize, landSize) VALUES ('12109 albert st', 'North Vancouver, BC', 'Townhouse', 2, 3, 1800, 2500);

INSERT INTO PropertyHas (listingAddress, location, type, numberOfRooms, numberOfBathrooms, interiorSize, landSize) VALUES ('81921 broadway st', 'North Vancouver, BC', 'House', 7, 3, 8500, 17000);

INSERT INTO PropertyHas (listingAddress, location, type, numberOfRooms, numberOfBathrooms, interiorSize, landSize) VALUES ('29292 livingston st', 'Vancouver, BC', 'House', 6, 3, 6000, 9060);

INSERT INTO PropertyHas (listingAddress, location, type, numberOfRooms, numberOfBathrooms, interiorSize, landSize) VALUES ('13418 45 st', 'Chilliwack, BC', 'House', 4, 2, 3060, 5200);

INSERT INTO PropertyHas (listingAddress, location, type, numberOfRooms, numberOfBathrooms, interiorSize, landSize) VALUES ('59678 fairmont st', 'Chilliwack, BC', 'House', 3, 2, 4600, 6000);

INSERT INTO PropertyHas (listingAddress, location, type, numberOfRooms, numberOfBathrooms, interiorSize, landSize) VALUES ('90800 hive st', 'Burnaby, BC', 'Condo', 3, 2, 2800, 4000);

INSERT INTO PropertyHas (listingAddress, location, type, numberOfRooms, numberOfBathrooms, interiorSize, landSize) VALUES ('12345 smoothdrive st', 'Vancouver, BC', 'House', 4, 3, 4800, 7200);

INSERT INTO PropertyHas (listingAddress, location, type, numberOfRooms, numberOfBathrooms, interiorSize, landSize) VALUES ('56482 walnut ave', 'Vancouver, BC', 'House', 5, 3, 6000, 9000);

INSERT INTO PropertyHas (listingAddress, location, type, numberOfRooms, numberOfBathrooms, interiorSize, landSize) VALUES ('16458 horshoe ave', 'Richmond, BC', 'Townhouse', 3, 2, 3000, 4500);

INSERT INTO PropertyHas (listingAddress, location, type, numberOfRooms, numberOfBathrooms, interiorSize, landSize) VALUES ('89754 snow ave', 'Richmond, BC', 'Apartment', 3, 1, 2000, 3000);

INSERT INTO PropertyHas (listingAddress, location, type, numberOfRooms, numberOfBathrooms, interiorSize, landSize) VALUES ('45687 lemon ave', 'Richmond, BC', 'House', 4, 3, 4900, 8000);

INSERT INTO PropertyHas (listingAddress, location, type, numberOfRooms, numberOfBathrooms, interiorSize, landSize) VALUES ('54672 cool st', 'Surrey, BC', 'House', 7, 5, 15000, 30000);

INSERT INTO PropertyHas (listingAddress, location, type, numberOfRooms, numberOfBathrooms, interiorSize, landSize) VALUES ('15462 curry st', 'Surrey, BC', 'House', 3, 2, 9000, 15000);

INSERT INTO PropertyHas (listingAddress, location, type, numberOfRooms, numberOfBathrooms, interiorSize, landSize) VALUES ('12398 stone ave', 'Richmond, BC', 'Townhouse', 3, 2, 6000, 7000);

INSERT INTO PropertyHas (listingAddress, location, type, numberOfRooms, numberOfBathrooms, interiorSize, landSize) VALUES ('12457 hare ave', 'Vancouver, BC', 'Duplex', 8, 4, 12000, 22000);