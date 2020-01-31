import { Resolvers } from "src/types/resolvers";
import Verification from "./../../../entities/Verification";
import User from "./../../../entities/User";
import {
  CompletePhoneVerifMutationArgs,
  CompletePhoneVerifResponse
} from "src/types/graphql";

const resolvers: Resolvers = {
  Mutation: {
    CompletePhoneVerif: async (
      _,
      args: CompletePhoneVerifMutationArgs
    ): Promise<CompletePhoneVerifResponse> => {
      const { phoneNumber, key } = args;
      try {
        const verification = await Verification.findOne({
          payload: phoneNumber,
          key
        });
        if (!verification) {
          return {
            ok: false,
            error: "Verification key is not valid",
            token: ""
          };
        } else {
          verification.verified = true;
          await verification.save();
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          
          token: "null"
        };
      }
      try {
        const user = await User.findOne({
          phoneNumber
        });
        if (!user) {
          return {
            ok: true,
            error: null,
            token: "Verified but have to create account"
          };
        } else {
          user.verifiedPhoneNumber = true;
          await user.save();
          return {
            ok: true,
            error: null,
            token: "Coming soon"
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: "null"
        };
      }
    }
  }
};

export default resolvers;
