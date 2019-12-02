export const typeDefs = ["type Query {\n  sayBay: String!\n  sayHello(name: String!): SeyHelloResponse\n}\n\ntype SeyHelloResponse {\n  text: String!\n  error: Boolean\n}\n"];
/* tslint:disable */

export interface Query {
  sayBay: string;
  sayHello: SeyHelloResponse | null;
}

export interface SayHelloQueryArgs {
  name: string;
}

export interface SeyHelloResponse {
  text: string;
  error: boolean | null;
}
