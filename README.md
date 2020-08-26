# Room Booking System
A room booking system built with MongoDB, Express, Node.js and ReactJS.

## Table of Contents

* [Getting started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [About project](#about-project)
* [Entity Relationship Diagram](#entity-relationship-diagram)
* [Flow Chart](#flow-chart)
* [Technologies](#technologies)
* [Challenges and final thoughts](#challenges-and-final-thoughts)

## Getting started
These instructions will get you a copy of the project up and running on your local machine for development purposes.
### Prerequisites
#### Back-end:
- MongoDB
- Express
- Node.js

```json
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "moment": "^2.27.0",
    "mongoose": "^5.10.0"
  },
  "devDependencies": {
    "eslint": "^7.7.0",
    "mocha": "^8.1.1",
    "nodemon": "^2.0.4",
    "prettier": "^2.0.5"
  }
```
#### Front-end:
- React.js
```json
  "dependencies": {
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.5.0",
    "@testing-library/user-event": "^7.2.1",
    "axios": "^0.20.0",
    "bootstrap": "^5.0.0-alpha1",
    "moment": "^2.27.0",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-hook-form": "^6.4.1",
    "react-router-dom": "^5.2.0",
    "react-scripts": "3.4.3"
  },
  "devDependencies": {
    "prettier": "^2.0.5"
  },
```
### Installation
Clone the repo
```
git clone https://github.com/Snow24Prince/HotelBookingSystem.git
```

Change to the `server` folder and install development and production dependencies.

```
cd server
npm install
```

Change to the `client` folder and install development and producation dependencies.
```
cd client
npm install
```

You will need to set up MongoDB Atlas. See [MongoDB](https://docs.mongodb.com/cloud/) for instructions.


Go to the `server` folder and start the server.
```
cd server
npm run start
```

Go to the `client` folder and run the script start script.
```
cd client
npm start
```

Open in your browser and navigate to http://localhost:3000. You access the back-end on http://localhost:5000.

## About project
A web-based application that allows the user to login from anywhere to easily, accurately and quickly make room bookings.

I designed the application to be an intuitive and simple, yet powerful way to navigate, analyse and create bookings. This ultimately enables the efficient use of resources.

This will help to ensure that room resources are used as fully-utilised as possible, whilst avoiding double-bookings and other common user frustrations. 


## Entity Relationship Diagram
[Entity Relationship Diagram](docs/HotelBookingSystem-ERD.png)

## Entity Relationship Diagram
[Flow Chart](docs/FlowChart.png)

## Technologies
- Node.js
- Express
- JWT
- Bootstrap
- MongoDB
- Mongoose
- React.js
- Moment.js

## Challenges and final thoughts

### Challenges
- Front End Design
- Validations
- JWT
- Working with dates and times

## Future developments
- Searching
- User permissions
