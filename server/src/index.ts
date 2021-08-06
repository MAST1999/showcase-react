import cors from "cors";
import express, { Request, Response } from "express";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import "reflect-metadata";
import { createConnection, getCustomRepository } from "typeorm";
import { User } from "./entity/User";
import { Route } from "./interface";
import { UserRepository } from "./repository/UserRepository";
import { Routes } from "./routes";

// connection for in file settings
// {
//   type: "mssql",
//   host: "localhost",
//   database: "showcase",
//   name: "connect1",
//   extra: {
//     driver: "msnodesqlv8",
//     options: {
//       trustedConnection: true
//     }
//   },
//   synchronize: false,
//   logging: false,
//   entities: ["src/entity/**/*.ts"],
//   migrations: ["src/migration/**/*.ts"],
//   subscribers: ["src/subscriber/**/*.ts"],
//   cli: {
//     "entitiesDir": "src/entity",
//     "migrationsDir": "src/migration",
//     "subscribersDir": "src/subscriber"
//   },
//   options: {
//     useUTC: true
//   }
// }

createConnection(
  {
    type: "mssql",
    host: "localhost",
    database: "showcase",
    username: "sa",
    password: "1234",
    port: 1435,
    extra: {
      validateConnection: false,
      trustServerCertificate: true,
    },
    synchronize: false,
    logging: false,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    cli: {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
    }
  }
)
  .then(async (connection) => {
    // create express app
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan("dev"));

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "./build/uploads/");
      },
      filename: (req, file, cb) => {
        cb(
          null,
          path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
        );
      },
    });

    const upload = multer({ storage });
    // register express routes from defined application routes
    Routes.forEach((route: Route) => {
      if (route.action === "file") {
        app[route.method](
          route.route,
          upload.array("files"),
          async (req: Request, res: Response, next: Function) => {
            const result = new route.controller()[route.action](req, res, next);
            if (result instanceof Promise) {
              const resultResponse = await result;
              const response = await Promise.all(resultResponse);
              response !== null && response !== undefined
                ? res.send(response)
                : res.status(404).send({ message: "Not found", response });
            } else if (result !== null && result !== undefined) {
              res.json(result);
            }
          }
        );
      } else {
        app[route.method](
          route.route,
          async (req: Request, res: Response, next: Function) => {
            const result = new route.controller()[route.action](req, res, next);
            if (result instanceof Promise) {
              const resultResponse = await result;
              resultResponse !== null && resultResponse !== undefined
                ? res.send(resultResponse)
                : res.send({ message: "Not found", resultResponse });
            } else if (result !== null && result !== undefined) {
              res.json(result);
            }
          }
        );
      }
    });

    // setup express app here
    app.use(express.static("build"));

    // start express server
    app.listen(5000);

    // insert new users for test

    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne({ username: "mast" });

    if (!user) {
      const user = new User();
      user.uuid = "c4ce4e0e-9386-4d96-a236-30edda85b0da";
      user.createdAt = new Date("2021-07-26T10:49:08.897Z");
      user.updatedAt = new Date("2021-07-26T10:49:08.897Z");
      user.username = "mast";
      user.email = "mast@gmail.com";
      user.password = "1234";

      await userRepository.save(user);
    }

    console.log(
      "Express server has started on port 5000. Open http://localhost:5000/users to see results"
    );


  })
  .catch((error) => console.log(error));
