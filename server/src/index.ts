import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import { Request, Response } from "express";
import routes from "./routes";
import { User } from "./entity/User";
import * as swaggerUi from "swagger-ui-express";
import * as YAML from "yamljs";

const swaggerDocument = YAML.load("./swagger.yaml");

createConnection()
  .then(async (connection) => {
    // create express app
    const app = express();
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.use("/api", routes);

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    // insert new users for test

    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/users to see results"
    );
  })
  .catch((error) => console.log(error));
