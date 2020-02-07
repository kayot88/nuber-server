import { Resolvers } from "src/types/resolvers";
import { privatResolver } from "./../../../utils/privatResolver";
import {
  RequestRideMutationArgs,
  RequestRideResponce
} from "src/types/graphql";
import User from "./../../../entities/User";
import Ride from "./../../../entities/Ride";

const resolvers: Resolvers = {
  Mutation: {
    RequestRide: privatResolver(
      async (
        _,
        args: RequestRideMutationArgs,
        { req, pubSub }
      ): Promise<RequestRideResponce> => {
        const user: User = req.user;
        try {
          const ride = await Ride.create({ ...args, passenger: user }).save();
          pubSub.publish("rideRequest", { RideSubsc: ride });
          return {
            ok: true,
            error: null,
            ride
          };
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
