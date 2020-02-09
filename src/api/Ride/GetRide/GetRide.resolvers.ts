import { Resolvers } from "src/types/resolvers";
import { privatResolver } from "./../../../utils/privatResolver";
import { GetRideQueryArgs, GetRideResponse } from "./../../../types/graphql.d";
import User from "./../../../entities/User";
import Ride from "./../../../entities/Ride";

const resolvers: Resolvers = {
  Query: {
    GetRide: privatResolver(
      async (_, args: GetRideQueryArgs, { req }): Promise<GetRideResponse> => {
        const user: User = req.user;
        try {
          const ride = await Ride.findOne({
            id: args.rideId
          });
          // await Ride.delete({})
          // user.isRiding = false;
          // user.isTaken = false;
          // user.save();
          if (
            (ride && ride.driverId === user.id) ||
            (ride && ride.passengerId === user.id)
          ) {
            return {
              ok: true,
              error: null,
              ride
            };
          } else {
            return {
              ok: false,
              error: "No Authorized or Ride not found",
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
      }
    )
  }
};

export default resolvers;
