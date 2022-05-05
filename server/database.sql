CREATE DATABASE real_estate_listing_application;

CREATE TABLE Buyer (
    buyerId BINARY(16) DEFAULT UUID(),
    buyerPhoneNumber BIGINT NOT NULL,
    buyerEmail VARCHAR(80) NOT NULL,
    buyerPassword VARCHAR(80) NOT NULL,
	buyerName VARCHAR(80) NOT NULL,
	buyerBirthday DATE,
    PRIMARY KEY(buyerId),
    UNIQUE(buyerPhoneNumber),
    UNIQUE(buyerEmail)
); 

CREATE TABLE Agent (
    agentId BINARY(16) DEFAULT UUID(),
    agentPhoneNumber BIGINT NOT NULL,
    agentEmail VARCHAR(80) NOT NULL,
    agentPassword VARCHAR(80) NOT NULL,
	agentName VARCHAR(80) NOT NULL,
	agentBirthday DATE,
    agentYearBegan YEAR,
    PRIMARY KEY(agentId),
    UNIQUE(agentPhoneNumber),
    UNIQUE(agentEmail)
);

CREATE TABLE AppointmentRequestsResponds (
    apptId INT AUTO_INCREMENT,
    agentId BINARY(16),
    buyerId BINARY(16),
    apptDescription VARCHAR(80),
    apptType VARCHAR(80), 
    apptTime TIME NOT NULL, 
    apptDate DATE NOT NULL,
    apptDuration INT NOT NULL,
    PRIMARY KEY(apptId),
    FOREIGN KEY (agentId) REFERENCES Agent(agentId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (buyerId) REFERENCES Buyer(buyerId)
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);

CREATE TABLE ListingHas (
    listingId INT AUTO_INCREMENT,
	agentId BINARY(16),
	price INT,
	PRIMARY KEY (listingId),
	FOREIGN KEY (agentId) REFERENCES Agent(agentId)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE PropertyHas (
    listingId INT,
    propertyAddress VARCHAR(80) NOT NULL, 
    propertyLocation VARCHAR(80) NOT NULL, 
    propertyType VARCHAR(80),
    propertyNumBedrooms INT, 
    propertyNumBathrooms INT, 
    propertyInteriorSize INT,
    propertyLandSize INT,
    PRIMARY KEY(listingId, propertyAddress),
    FOREIGN KEY(listingId) REFERENCES ListingHas(listingId) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE ImageUploads (
	imageId INT AUTO_INCREMENT,
	imageTitle VARCHAR(80) NOT NULL,
    imageUrl VARCHAR(100) NOT NULL,
	imageWidth INT, 
	imageHeight INT, 
	imageDescription VARCHAR(80),
	imageFormatType VARCHAR(80),
	listingId INT,
	PRIMARY KEY (imageId),
	FOREIGN KEY (listingId) REFERENCES ListingHas (listingId)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);