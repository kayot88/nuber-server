import { GraphQLServer } from "graphql-yoga";
// import {buildSchema} from 'type-graphql';
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schema";
// import jwt from 'jsonwebtoken';
import decodeJWT from "./utils/decodeJWT";
class App {
  public app: GraphQLServer;

  constructor() {
    this.app = new GraphQLServer({
      schema
    });
    this.middlewares();
  }
  // schema = async () => await buildSchema({});
  private middlewares = (): void => {
    this.app.express.use(cors());
    this.app.express.use(helmet());
    this.app.express.use(logger("dev"));
    this.app.use(this.jwt);
  };
  private jwt = async (req, res, next): Promise<void> => {
    const getJwtFromReq = req.get("X-JWT");
    // console.log(getJwtFromReq)
    if (getJwtFromReq) {
      const token = await decodeJWT(getJwtFromReq);
      console.log(token);
    }
    next();
  };
}
export default new App().app;
