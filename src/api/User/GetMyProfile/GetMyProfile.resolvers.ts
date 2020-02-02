import { Resolvers } from "src/types/resolvers";
import { privatResolver } from "../../../utils/privatResolver";
const resolvers: Resolvers = {
  Query: {
    GetMyProfile: privatResolver((_, __, { req }) => {
      const { user } = req;
      return {
        ok: true,
        user,
        error: null
      };
    })
  }
};

export default resolvers;
