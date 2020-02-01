import { Resolvers } from "../../../types/resolvers";
import User from "./../../../entities/User";
import createJWT from './../../../utils/createJWT';
import {
  EmailSignUpMutationArgs,
  EmailSignUpResponse
} from "./../../../types/graphql.d";
const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: async (
      _,
      args: EmailSignUpMutationArgs
    ): Promise<EmailSignUpResponse> => {  
      const { email } = args;
      try {
        const existUserWithThisEmail = await User.findOne({ email });
        if (!existUserWithThisEmail) {
          const newUser =  await User.create({ ...args }).save();
          const token = createJWT(newUser.id);
          return {
            ok: true,
            error: null,
            token
          };
        } else {
          return {
            ok: false,
            error: "You should logIn instead",
            token: null
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
    }
  }
};
export default resolvers;
