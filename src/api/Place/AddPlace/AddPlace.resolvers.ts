import { Resolvers } from "src/types/resolvers";
import User from "./../../../entities/User";
import Place from "./../../../entities/Place";
import { privatResolver } from "./../../../utils/privatResolver";
import { AddPlaceResponse, AddPlaceMutationArgs } from "../../../types/graphql";

const resolvers: Resolvers = {
  Mutation: {
    AddPlace: privatResolver(
      async (
        _,
        args: AddPlaceMutationArgs,
        { req }
      ): Promise<AddPlaceResponse> => {
        const user: User = req.user;
        try {
          await Place.create({ ...args, user }).save();
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
