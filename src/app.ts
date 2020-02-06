import { GraphQLServer, PubSub } from "graphql-yoga";
import { NextFunction, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schema";
import decodeJWT from "./utils/decodeJWT";
class App {
  public app: GraphQLServer;
  public pubSub: any;

  constructor() {
    this.pubSub = new PubSub();
    this.pubSub.ee.setMaxListeners(99);
    this.app = new GraphQLServer({
      schema,
      // add request to context
      context: req => {
      //  or const {connection:{context = null} = {}} = req
        if (!req.connection) {
          return {
            req: req.request,
            pubSub: this.pubSub,
            connectionContext: null
          };
        } else {
          const context = req.connection.context;
          return {
            req: req.request,
            pubSub: this.pubSub,
            connectionContext: context
          };
        }
      }
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
  private jwt = async (
    req,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const getJwtFromReq = req.get("X-JWT");
    // console.log(getJwtFromReq)
    if (getJwtFromReq) {
      const user = await decodeJWT(getJwtFromReq);
      // add user object to request
      if (user) {
        req.user = user;
      } else {
        req.user = undefined;
      }
    }
    next();
  };
}
export default new App().app;
