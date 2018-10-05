## Author ##

### Emmanuel Selby ###
#### fetz.selby@gmail.com ###


## How to Run ##

*I'm assuming MySQL and Git is already installed on your machine(Linux, OSX, Windows). if not, please visit https://www.mysql.com/downloads/ and https://git-scm.com/book/en/v2/Getting-Started-Installing-Git respectively.*

1. Install Node JS https://nodejs.org/en/
2. For building `npm i webpack -g`
3. For running test scripts `npm i mocha -g`
4. Clone the repo `git clone https://github.com/fetz-selby/we-cinema-ticketing.git wibas-etarate`
5. `cd wibas-etarate`
6. `npm install`


## Configuring Application ##

### configuring MySQL ###

1. Create Database with name WIBAS_TEST

`CREATE DATABASE WIBAS_TEST CHARACTER SET latin1 COLLATE latin1_swedish_ci`

  
2. Create user for accessing the Database 

`CREATE USER 'wibas_admin'@'localhost' IDENTIFIED BY 'pa55w0rd'`

  
3. Enable privileges 

`GRANT ALL PRIVILEGES ON * . * TO 'wibas_admin'@'localhost`

  
4. Flush 

`FLUSH PRIVILEGES`

  


### configuring wibas-online-cinema-ticket application ###

1. Locate `config.js` on the root directory of the application.

   *change the SERVER_PORT if the default is unavailable*
     
2. On first run of the application, edit `config.js` and set `prepare:true`. This is to initialize the database with `Vorstellungen.txt` and the three files(Hall files) in auditoria directory(`SAAL 1.txt, SAAL 2.txt, SAAL 3.txt`).

  
3. Make sure the DB_NAME, DB_USER and DB_PASSWORD matches our database(MySQL) we just created.

  
4. Change directory into wibas-etarate directory, and execute 
`npm run start-app`
  

5. Run the test scripts to assert all API functionalities. They are located in `wibas-etarate/test/routers`. Run `mocha movieRouterTest.js`,  `mocha auditoriumRouterTest.js` and  `mocha ticketRouterTest.js`

**All test MUST run successful before using the application**

The application will build, compile and run. Open your browser and visit your localhost or you loopback(127.0.0.1) with the specified port.

## Overview of wibas online cinema ticket application ##
In simplifying, and solving some of the worlds problems, wibas-etarate has built an online ticket booking application. This allows customers to purchase movie tickets at their convenience. Requirement needed to purchase a ticket is a credit/debit card. Below are the stages

The entire process is in four stages.
1. Select a time base on film you're interested
2. Choose a seat where you'd want to enjoy the film
3. Make payment with your debit/credit card
    * payment MUST be made within 5 minutes(configurable)  otherwise, seat will be available for other customers.
4. View or download your summary/invoice

## Backlogs ##
* create admin interface for uploading `Vorstellungen.txt` and the hall files. `SAAL 1.txt, SAAL 2.txt, SAAL 3.txt`.
* use json structure for `Vorstellungen.txt`.
* implement real-time database and timed-out sessions using firebase and json web tokens respectively.
* upgrade the UI/UX of the application

[view demo](http://35.231.169.193:7001/)

## Technologies and Frameworks used ##
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [NodeJS](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Sequelize](http://docs.sequelizejs.com/)
* [JWT](https://jwt.io/)

