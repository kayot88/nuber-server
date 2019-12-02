import {
  SayHelloQueryArgs,
  SeyHelloResponse
} from "./../../../types/graphql.d";

const resolvers = {
  Query: {
    sayHello: (_: any, args: SayHelloQueryArgs): SeyHelloResponse => {
      return {
        error: false,
        text: `fuck you ${args.name}`
      };
    }
  }
};



export default resolvers;
