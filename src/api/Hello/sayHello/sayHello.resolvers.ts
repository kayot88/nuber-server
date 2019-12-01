import { Greeting } from "src/types/graphql";

const resolvers = {
  Query: {
    sayHello: (): Greeting => {
      return {
        error: false,
        text: "fuck you"
      };
    }
  }
};

export default resolvers;
