import "reflect-metadata";
import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";
import { container } from "./container";
import "./users/users.controller";
import "./auth/auth.controller";

const app = express();
const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(express.json());
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
});

const appInstance = server.build();
appInstance.listen(3000, () => {
  console.log("Server started on port 3000");
});
