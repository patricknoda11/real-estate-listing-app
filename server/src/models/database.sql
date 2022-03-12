CREATE DATABASE real_estate_simulation;
-- DATE − A date in YYYY-MM-DD format, between 1000-01-01 and 9999-12-31.
-- VARCHAR(M) − A variable-length string between 1 and 255 characters in length. For example, VARCHAR(25). You must define a length when creating a VARCHAR field.
-- TIME − Stores the time in a HH:MM:SS format.

CREATE TABLE Stager (
	stagerPhoneNumber int,
	stagerName varchar(30),
	yearsExperience int,
	PRIMARY KEY (stagerPhoneNumber)
);

CREATE TABLE Contracts (
	stagerPhoneNumber int,
	userPhoneNumber int,
	PRIMARY KEY (stagerPhoneNumber, userPhoneNumber),
	FOREIGN KEY (stagerPhoneNumber) REFERENCES Stager
		ON DELETE CASCADE
		ON UPDATE CASCADE
	FOREIGN KEY (userPhoneNumber) REFERENCES Agent
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

ImageUploads (
	url varchar(80),
	title varchar(80),
	Width int, 
	Height int, 
	description varchar(80),
	formatType varchar(80),
	Resolution, int
	listingId int,
	PRIMARY KEY (url)
	FOREIGN KEY (listingId) REFERENCES Listing
		ON DELETE CASCADE
		ON UPDATE CASCADE
	FOREIGN KEY (width, height) REFERENCES WidthHeight
		ON DELETE CASCADE
		ON UPDATE CASCADE
	FOREIGN KEY (formatType, resolution) REFERENCES FormatTypeResolution
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

WidthHeight (
	width int,
	height int,
	resolution int,
	PRIMARY KEY(width, height)
);

FormatTypeResolution (
	formatType varchar(80),
	resolution int,
	quality varchar(80),
	PRIMARY KEY (formatType, resolution)
);

CREATE TABLE ListingOwnsHas (
	listingId int,
	ownerPhoneNumber int NOT NULL,
	userPhoneNumber int,
	price int,
	PRIMARY KEY (listingId)
	FOREIGN KEY (ownerPhoneNumber) REFERENCES Owner
		ON DELETE CASCADE
		ON UPDATE CASCADE
	FOREIGN KEY (userPhoneNumber) REFERENCES Agent
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE Owner (
	ownerPhoneNumber int,
	ownerName varchar(80),
	PRIMARY KEY (ownerPhoneNumber)
);

CREATE TABLE PropertyHas (
    listingId int NOT NULL, 
    location varchar(80), 
    type varchar(80),
    numberOfRooms int, 
    numberOfBathrooms int, 
    interiorSize int,
    landSize int
    PRIMARY KEY(listingId, location),
    UNIQUE (listingId),
    FOREIGN KEY(listingId) REFERENCES Listing 
    ON DELETE CASCADE
    ON UPDATE CASCADE
)

CREATE TABLE AccountHas(
    accId int, 
    userPhoneNumber int, 
    username varchar(80), 
    acctName varchar(80), 
    email varchar(80), 
    password varchar(80),
    PRIMARY KEY(accId),
    FOREIGN KEY(userPhoneNumber) REFERENCES User 
	    ON DELETE CASCADE 
	    ON UPDATE CASCADE
);

CREATE TABLE Manages(
    accId int,
    adminId int,
    PRIMARY KEY(accId, adminId),
    FOREIGN KEY(accId) REFERENCES Account 
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY(adminId) REFERENCES Admin 
	    ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Admin(
    adminId int,
    PRIMARY KEY(adminID)
);

CREATE TABLE Buyer (
    userPhoneNumber int,
    name varchar(80), 
    birthday Date, 
    typePreference varchar(80), 
    budget int,
    PRIMARY KEY(userPhoneNumber)
); 

CREATE TABLE Agent (
    userPhoneNumber int, 
    name varchar(80), 
    birthday Date, 
    yearsExperience int,
    preferredMeetingDuration int,
    preferredInPersonMeetingLocation varchar(80),
    PRIMARY KEY(userPhoneNumber)
);

CREATE TABLE AppointmentRequestsResponds(
apptDate Date,
agentPhoneNumber int, 
description varchar(80),
type varchar(80), 
buyerPhoneNumber int, 
time int, 
PRIMARY KEY(agentPhoneNumber, buyerPhoneNumber, apptDate, time),
FOREIGN KEY (agentPhoneNumber, type) REFERENCES R1
	ON DELETE CASCADE
	ON UPDATE CASCADE
FOREIGN KEY (apptDate, agentPhoneNumber, buyerPhoneNumber) REFERENCES R2
	ON DELETE CASCADE
	ON UPDATE CASCADE
FOREIGN KEY (agentPhoneNumber) REFERENCES Agent 
         ON DELETE CASCADE
ON UPDATE CASCADE
FOREIGN KEY (buyerPhoneNumber) REFERENCES Buyer
	ON DELETE CASCADE 
	ON UPDATE CASCADE
);

CREATE TABLE R1 (
	agentPhoneNumber int,
	type varchar(80), 
	location varchar(80),
	duration int
	PRIMARY KEY(agentPhoneNumber, type)
);

CREATE TABLE R2(
	apptDate Date,
agentPhoneNumber int,
buyerPhoneNumber int,
apptName varchar(80),
PRIMARY KEY(apptDate, agentPhoneNumber, buyerPhoneNumber)
);


