export const typeDefs = [
  "type Query {\n  sayBay: String!\n  sayHello: Greeting\n}\n\ntype Greeting {\n  text: String!\n  error: Boolean\n}\n"
];
/* tslint:disable */

export interface Query {
  sayBay: string;
  sayHello: Greeting | null;
}

export interface Greeting {
  text: string;
  error: boolean | null;
}
