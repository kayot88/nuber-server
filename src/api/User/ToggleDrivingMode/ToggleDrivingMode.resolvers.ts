import { Resolvers } from "src/types/resolvers";
import { privatResolver } from "./../../../utils/privatResolver";
import User from "./../../../entities/User";
import { ToggleDrivingModeResponse } from "src/types/graphql";
const resolvers: Resolvers = {
  Mutation: {
    ToggleDrivingMode: privatResolver(
      async (_, __, { req }): Promise<ToggleDrivingModeResponse> => {
        const user: User = req.user;
        try {
          if (user.isDriving) {
            user.isDriving = !user.isDriving;
            user.save();
            return {
              ok: true,
              error: null
            };
          }
          return {
            ok: false,
            error: "Something went wrong"
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message
          };
        }
      }
    )
  }
};

export default resolvers;
