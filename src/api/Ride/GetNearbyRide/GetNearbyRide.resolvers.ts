import { getRepository, Between } from "typeorm";
import { Resolvers } from "src/types/resolvers";
import { privatResolver } from "../../../utils/privatResolver";
import User from "../../../entities/User";
import { GetNearbyRideResponse } from "src/types/graphql";
import Ride from "../../../entities/Ride";
const resolvers: Resolvers = {
  Mutation: {
    GetNearbyRide: privatResolver(
      async (_, __, { req }): Promise<GetNearbyRideResponse> => {
        const user: User = req.user;
        if (user.isDriving) {
          const { lastLat, lastLng } = user;
          try {
            const ride = await getRepository(Ride).findOne({
              status: "REQUESTING",
              pickUpLng: Between(lastLat - 0.05, lastLat + 0.05),
              pickUpLat: Between(lastLng - 0.05, lastLng + 0.05)
            });
            if (ride) {
              return {
                ok: true,
                error: null,
                ride
              };
            } else {
              return {
                ok: true,
                error: null,
                ride: null
              };
            }
          } catch (error) {
            return {
              ok: false,
              error: error.message,
              ride: null
            };
          }
        } else {
          return {
            ok: false,
            error: "You are not a driver",
            ride: null
          };
        }
      }
    )
  }
};
export default resolvers;
