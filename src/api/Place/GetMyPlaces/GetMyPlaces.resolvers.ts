import { Resolvers } from "src/types/resolvers";
import { privatResolver } from "./../../../utils/privatResolver";
import User from "./../../../entities/User";
import { GetMyPlacesResponce } from "./../../../types/graphql.d";

const resolvers: Resolvers = {
  Query: {
    GetMyPlaces: privatResolver(
      async (_, __, { req }): Promise<GetMyPlacesResponce> => {
        try {
          const user = await User.findOne(
            { id: req.user.id },
            { relations: ["places"] }
          );
          if (user) {
            return {
              ok: true,
              error: null,
              places: user.places
            };
          }
          return {
            ok: false,
            error: "No places found",
            places: null
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            places: null
          };
        }
      }
    )
  }
};

export default resolvers;
