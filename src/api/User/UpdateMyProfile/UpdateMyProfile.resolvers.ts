import { Resolvers } from "src/types/resolvers";
import { privatResolver } from "./../../../utils/privatResolver";
import User from "./../../../entities/User";
import {
  UpdateMyProfileMutationArgs,
  UpdateMyProfileResponse
} from "src/types/graphql";

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privatResolver(
      async (
        _,
        args: UpdateMyProfileMutationArgs,
        { req }
      ): Promise<UpdateMyProfileResponse> => {
        const user: User = req.user;
        const notNullArgs = {};
        Object.keys(args).forEach(key => {
          if (args[key] !== null) {
            notNullArgs[key] = args[key];
          }
        });
        try {
          if (args.password !== null) {
            user.password = args.password;
            user.save();
          }
          await User.update({ id: user.id }, { ...notNullArgs });
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
    )
  }
};

export default resolvers;
