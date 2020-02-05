import { Between, getRepository } from "typeorm";
import { Resolvers } from "src/types/resolvers";
import { privatResolver } from "./../../../utils/privatResolver";
import User from "./../../../entities/User";
import { GetNearbyDriversRsponse } from "./../../../types/graphql.d";

const resolvers: Resolvers = {
  Query: {
    GetNearbyDrivers: privatResolver(
      async (_, __, { req }): Promise<GetNearbyDriversRsponse> => {
        const user: User = req.user;
        const { lastLat, lastLng } = user;
        try {
          const drivers:User[] = await getRepository(User).find({
            isDriving: true,
            lastLat: Between(lastLat - 0.05, lastLat + 0.05),
            lastLng: Between(lastLng - 0.05, lastLng + 0.05)
          });
          console.log('drivers', drivers);
          return {
            ok: true,
            error: null,
            drivers
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            drivers: null
          };
        }
      }
    )
  }
};
export default resolvers;
