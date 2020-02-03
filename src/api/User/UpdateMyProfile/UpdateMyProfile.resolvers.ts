import { Resolvers } from "src/types/resolvers";
import {
  UpdateMyProfileMutationArgs,
  UpdateMyProfileResponse
} from "src/types/graphql";
import { privatResolver } from "./../../../utils/privatResolver";
import User from "./../../../entities/User";
import cleanArgsNull from "./../../../utils/cleanArgsNull";

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privatResolver(
      async (
        _,
        args: UpdateMyProfileMutationArgs,
        { req }
      ): Promise<UpdateMyProfileResponse> => {
        const user: User = req.user;
        const notNullArgs = cleanArgsNull(args);
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
