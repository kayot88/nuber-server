import { Resolvers } from "src/types/resolvers";
import { privatResolver } from "./../../../utils/privatResolver";
import User from "./../../../entities/User";
import cleanArgsNull from "./../../../utils/cleanArgsNull";
import Place from "./../../../entities/Place";
import {
  EditPlaceMutationArgs,
  EditPlaceResponse
} from "./../../../types/graphql.d";
const resolvers: Resolvers = {
  Mutation: {
    EditPlace: privatResolver(
      async (
        _,
        args: EditPlaceMutationArgs,
        { req }
      ): Promise<EditPlaceResponse> => {
        const user: User = req.user;
        const notNull = cleanArgsNull(args);
        try {
          const place = await Place.findOne({ id: args.id });
          if (place) {
            if (place.userId === user.id) {
              await Place.update({ id: args.id }, { ...notNull });
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "User not found"
              };
            }
          } else {
            return {
              ok: false,
              error: "Place not found"
            };
          }
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
