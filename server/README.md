# This is the server for the app

## Start

### DataBase

You need to have Postgresql installed, then you need to go to `ormconfig.json` to edit the connection to suit you. Either create a database with the save name or change the database as well. Then enter you username and password for the database.

Then you need to use `typeorm migration:run` to sync the database with the latest changes.

### Server

For starting the server first install all the packages using `yarn install` then use `yarn dev` to start the typescript server. After that use `yarn start:js` to start the server with `nodemon`;
