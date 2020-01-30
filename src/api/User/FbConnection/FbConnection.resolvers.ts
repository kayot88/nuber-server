import User from "./../../../entities/User";

import { Resolvers } from "../../../types/resolvers";
import {
  FbConResponse,
  FbConnectionMutationArgs
} from "./../../../types/graphql.d";

const resolvers: Resolvers = {
  Mutation: {
    FbConnection: async (
      _,
      args: FbConnectionMutationArgs
    ): Promise<FbConResponse> => {
      const { fbId } = args;
      try {
        const existingUser = await User.findOne({ fbId });
        if (existingUser) {
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
          token: null
        };
      }
      try {
        await User.create({
          ...args,
          profilePhoto: `https://graph.facebook.com/${fbId}/picture?type=normal`
        }).save();

        return {
          ok: true,
          error: null,
          token: "Coming soon"
        };
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
