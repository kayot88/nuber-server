import { Options } from "graphql-yoga";
import app from "./app";
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
app.start(appOptions, handleAppStart);
