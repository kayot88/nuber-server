import { Resolvers } from "src/types/resolvers";
import Verification from "./../../../entities/Verification";
import {
  StartPhoneVerificationMutationArgs,
  StartPhoneVerificationResponse
} from "src/types/graphql";
import { sendVerificationSMS } from "../../../utils/sendSms";

const resolvers: Resolvers = {
  Mutation: {
    StartPhoneVerification: async (
      _,
      args: StartPhoneVerificationMutationArgs
    ): Promise<StartPhoneVerificationResponse> => {
      const { phoneNumber } = args;
      try {
        const existVerification = await Verification.findOne({
          payload: phoneNumber
        });
        if (existVerification) {
          existVerification.remove();
        }
        const newVerification = await Verification.create({
          target: "PHONE",
          payload: phoneNumber
        }).save();
        await sendVerificationSMS(newVerification.payload, newVerification.key);
        console.log(newVerification);
        return {
          ok: true,
          error: null
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    }
  }
};

export default resolvers;
