import dotenv from "dotenv";
dotenv.config();
import { Options } from "graphql-yoga";
import { createConnection } from "typeorm";
import app from "./app";
import connectionOptions from "./ormConfig";
// console.log(process.env);
// yoga-server start
const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/qraphql";

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND,
  endpoint: GRAPHQL_ENDPOINT
};

const handleAppStart = () =>
  console.log(`listening on http://localhost:${PORT}/playground`);
try {
  createConnection(connectionOptions).then(() =>
    app.start(appOptions, handleAppStart)
  );
} catch (error) {
  console.log(error);
}
// yoga-server start 🔼
