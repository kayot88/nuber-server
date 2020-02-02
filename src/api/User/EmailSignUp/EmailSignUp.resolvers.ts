import { Resolvers } from "../../../types/resolvers";
import User from "./../../../entities/User";
import createJWT from "./../../../utils/createJWT";
import Verification from "./../../../entities/Verification";
import { sendVerificationEmail } from "./../../../utils/sendEmail";
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
          const newUser = await User.create({ ...args }).save();

          const phoneVerification = await Verification.findOne({
            payload: args.phoneNumber,
            verified: true
          });
          if (phoneVerification) {
            if (newUser.email) {
              const emailVerification = await Verification.create({
                target: "EMAIL",
                payload: newUser.email
              }).save();
              await sendVerificationEmail(
                newUser.fullName,
                emailVerification.key
              );
            }
            const token = createJWT(newUser.id);
            return {
              ok: true,
              error: null,
              token
            };
          } else {
            return {
              ok: false,
              error: "You dont verified your phone number",
              token: null
            };
          }
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
