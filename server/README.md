# This is the server for the app

## Start

### DataBase

You need to go to `ormconfig.json` to edit the connection to suit you meaning select the database you want to use from the available databases `mysql, mariadb, postgres, cockroachdb, sqlite, mssql, oracle, mongodb, cordova, react-native, expo, nativescript` and put it in the `type` section. Afterwards Either create a database with the save name or change the database as well. Then enter you username and password for the database (the current value is for my database).

Then you need to use `yarn typeorm migration:run` to sync the database with the latest changes.
Alternatively if that didn't work use `yarn typeorm schema:sync` to sync the database with the changes.

### Server

For starting the server first install all the packages using `yarn install` then use `yarn dev` to start the typescript server. After that use `yarn start` to start the server.
