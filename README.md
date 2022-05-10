# Real Estate Listing Application
|![ezgif com-gif-maker (4)](https://user-images.githubusercontent.com/82549471/167580999-cfcbccdf-9896-43f8-a5b8-6175b02080a5.gif)|
|:--:|
|Quick project overview|

## About
Welcome to the Real-estate listing application! This project was designed and implemented by three tech-loving UBC students. The project provided a platform to apply the core principles of designing a RESTful Api, as well as integrate our knowledge regarding database design. The application was constructed as a full-stack application. The client was developed using ReactJs, and the server was developed using NodeJs, ExpressJs and MySQL.
  
## Features
Some of the features implemented in the project:
  - Searching for specific listings 
  - Creating new listings
  - Editing/deleting current listings
  - Analytics/Insight for listings (ex: finds the most/least expensive listing, avg listing price, etc)
  - Analytics/Insight for Agents (ex: finding each agents highest/lowest priced listing and his/her avg listing price, only if he/she has a certain number of listings)
  - Creating/deleting Users (ex: Agents)
  - Retrieving all available agents

## Current/Future Plans
- adding JWT token authentication for different user types to access private routes
- display listings on a Map by utilizing Leaflet interactive library

---
## Database Design
|![Copy of ER_diagram_milestone1 drawio (1)](https://user-images.githubusercontent.com/82549471/167586141-0f64321e-b3ea-4c16-a62d-98779e8462f8.png)|
|:--:|
|Database Entity-Relationship Diagram|
  
The database was designed with the intent of minimizing redundancy. This was achieved by representing one-to-many entity relationships as two tables in a database instead of three. Furthermore, entities that had functional dependencies, such as the Appointment entity, were decomposed using BCNF decomposition to effectively eliminate insertion, deletion and update anomalies.
  
---
  
## Demonstration/Usage
### Searching for Specific Listings
|![searching_listings](https://user-images.githubusercontent.com/82549471/167572302-64a69261-e088-4e7d-ab86-af4c64172588.gif)|
|:--:|
|Searching for specific listings by properties including number of bathrooms/bedrooms, interior/land size, and price range|

### Agent Analytics and Listing Analytics
|![ezgif com-gif-maker (5)](https://user-images.githubusercontent.com/82549471/167594282-e4bfb1cd-5041-4a80-8e7a-e8e4e8d4e4cd.gif)|
|:--:|
|Looks for each Agent's highest/lowest/average listing prices as well as their total number of listings, if he/she has greater than or equal number of listings specified|

We accomplished the above task by using nested group by query:

SELECT name, phoneNumber, Agent.agentEmail, MAX(price) AS max, MIN(price) AS min, AVG(price) AS avg, COUNT(*) AS cnt FROM Agent, ListingHas WHERE       Agent.agentEmail=ListingHas.agentEmail GROUP BY Agent.agentEmail HAVING ? <= (SELECT COUNT(*) FROM ListingHas LOH2 WHERE Agent.agentEmail=LOH2.agentEmail);

---
## Technologies

### Client:

- [React.js](https://reactjs.org/)
- [Sass](https://sass-lang.com/)
- [Bootstrap](https://getbootstrap.com)

### Server:

- [Node.js](https://jquery.com)
- [Express.js](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)

---

## Getting Started

1. Clone the repository
   ```sh
   git clone https://github.com/patricknoda11/real-estate-listing-app.git
   ```
2. Change directories into server/ and install package dependencies
   ```sh
   cd server
   npm install
   ```
3. Change directories into client/ and install package dependencies

   ```sh
   cd ../client
   npm install
   ```
4. Download and configure MySQL following instructions on https://www.mysql.com/downloads/
  
5. Create and configure .env file with the following variables for server

   ```sh
    MYSQL_HOST=localhost
    MYSQL_PORT=3306
    MYSQL_DATABASE=real_estate_simulation
    MYSQL_USER=root
    MYSQL_PASSWORD=YourPasswordHere
    MYSQL_CONNECTION_LIMIT=20
    MYSQL_QUEUE_LIMIT=5
    MYSQL_WAIT_FOR_CONNECTIONS=true
    MYSQL_MULTIPLE_STATMENTS=true
    SERVER_PORT=YourServerPortHere
   ```

5. Move to server directory and run server by typing npm start
   ```sh
   cd server
   npm start
   ```
6. On another terminal, run the client package by typing npm start

   ```sh
   cd client
   npm start
   ```
  
