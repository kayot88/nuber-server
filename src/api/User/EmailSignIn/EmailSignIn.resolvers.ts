import { Resolvers } from "src/types/resolvers";
import User from "../../../entities/User";
import {
  EmailSignInResponse,
  EmailSignInMutationArgs
} from "src/types/graphql";

const resolvers: Resolvers = {
  Mutation: {
    EmailSignIn: async (
      _,
      args: EmailSignInMutationArgs
    ): Promise<EmailSignInResponse> => {
      const { email, password } = args;
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return {
            ok: false,
            error: "No user with this email was found",
            token: null
          };
        }
        const checkPassword = await user.comparePassword(password);
        if (checkPassword) {
          return {
            ok: true,
            error: null,
            token: "Commig soon"
          };
        } else {
          return {
            ok: false,
            error: "Wrong password",
            token: "Commig soon"
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
