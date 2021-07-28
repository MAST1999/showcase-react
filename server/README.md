# Server initialization

As always first install the dependencies with `yarn install`.

## Setting up the database

You need to go to `ormconfig.json` to edit the connection to suit you meaning select the database you want to use from the available databases `mysql, mariadb, postgres, cockroachdb, sqlite, mssql, oracle, mongodb, cordova, react-native, expo, nativescript` and put it in the type section.
Afterwards Either create a database with the save name or change the database as well. Then enter you username and password for the database (the current value is for my database).

Next run `yarn typeorm migration:run` to prepare the database.

## Starting the server

To start the server simply type `yarn start` to start the server. Now you are ready to go to the app and start it up.
