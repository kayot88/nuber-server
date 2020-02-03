import { Resolvers } from "src/types/resolvers";
import { privatResolver } from "./../../../utils/privatResolver";
import User from "./../../../entities/User";
import Verification from "./../../../entities/Verification";
import {
  CompleteEmailVerificationMutationArgs,
  CompleteEmailVerificationResponse
} from "src/types/graphql";

const resolvers: Resolvers = {
  Mutation: {
    CompleteEmailVerification: privatResolver(
      async (
        _,
        args: CompleteEmailVerificationMutationArgs,
        { req }
      ): Promise<CompleteEmailVerificationResponse> => {
        const user: User = req.user;
        const { key } = args;
        if (user.email && !user.verifiedEmail) {
          console.log('verified', user.verifiedEmail);
          try {
            const verification = await Verification.findOne({
              key,
              payload: user.email
            });
            if (verification) {
              user.verifiedEmail = true
              user.save()
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "Cant verify email"
              };
            }
          } catch (error) {
            return {
              ok: false,
              error: error.message
            };
          }
        } else {
          return {
            ok: false,
            error: "No email to verify"
          };
        }
      }
    )
  }
};

export default resolvers;
