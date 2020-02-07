import { getRepository, Between } from "typeorm";
import { Resolvers } from "src/types/resolvers";
import { privatResolver } from "./../../../utils/privatResolver";
import User from "./../../../entities/User";
import { GetNearbyRidesResponse } from "src/types/graphql";
import Ride from "./../../../entities/Ride";
const resolvers: Resolvers = {
  Mutation: {
    GetNearbyRides: privatResolver(
      async (_, __, { req }): Promise<GetNearbyRidesResponse> => {
        const user: User = req.user;
        if (user.isDriving) {
          const { lastLat, lastLng } = user;
          try {
            const rides = await getRepository(Ride).find({
              status: "REQUESTING",
              pickUpLng: Between(lastLat - 0.05, lastLat + 0.05),
              pickUpLat: Between(lastLng - 0.05, lastLng + 0.05)
            });
            return {
              ok: false,
              error: null,
              rides
            };
          } catch (error) {
            return {
              ok: false,
              error: error.message,
              rides: null
            };
          }
        } else {
          return {
            ok: false,
            error: "You are not a driver",
            rides: null
          };
        }
      }
    )
  }
};
export default resolvers;
