## Author ##

### Emmanuel Selby ###
#### fetz.selby@gmail.com ###


## How to Run ##

*I'm assuming MySQL and Git is already installed on your machine(Linux, OSX, Windows). if not, please visit https://www.mysql.com/downloads/ and https://git-scm.com/book/en/v2/Getting-Started-Installing-Git respectively.*

1. Install Node JS https://nodejs.org/en/
2. For building `npm i webpack -g`
3. For running test scripts `npm i mocha -g`
4. Clone the repo `git clone https://github.com/fetz-selby/we-cinema-ticketing.git wibas-eterate`
5. `cd wibas-eterate`
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

1. Locate config.js on the root directory of the application.
   *change the SERVER_PORT if the default is unavailable*
2. On first run of the application, prepare MUST be changed to true. This is to initialize the database with `Vorstellungen.txt` and the three files(Hall files) in auditoria directory.
3. Make sure the DB_NAME, DB_USER and DB_PASSWORD matches our database(MySQL) we just created.
4. Change directory into wibas-eterate directory, and execute 
`npm run start-app`
5. Run the test scripts to assert all API functionalities. They are located in `wibas-eterate/test/routers`. Run `mocha movieRouterTest.js`,  `mocha auditoriumRouterTest.js` and  `mocha purchaseRouterTest.js`

**All test MUST run successful before using the application**

The application will build, compile and run. Open your browser and visit your localhost or you loopback with the specified port.