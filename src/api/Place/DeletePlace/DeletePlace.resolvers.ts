import { Resolvers } from "src/types/resolvers";
import { privatResolver } from "./../../../utils/privatResolver";
import User from "src/entities/User";
import Place from "./../../../entities/Place";
import {
  DeletePlaceMutationArgs,
  DeletePlaceResponse
} from "./../../../types/graphql.d";
const resolvers: Resolvers = {
  Mutation: {
    DeletePlace: privatResolver(
      async (
        _,
        args: DeletePlaceMutationArgs,
        { req }
      ): Promise<DeletePlaceResponse> => {
        const user: User = req.user;
        try {
          const place = await Place.findOne({ id: args.placeId });
          if (place) {
            if (place.userId === user.id) {
              await place.remove();
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "No user found"
              };
            }
          } else {
            return {
              ok: false,
              error: "No place found"
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
