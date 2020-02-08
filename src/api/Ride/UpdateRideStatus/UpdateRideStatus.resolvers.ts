import { Resolvers } from "src/types/resolvers";
import { privatResolver } from "../../../utils/privatResolver";
import { UpdateRideStatusMutationArgs } from "./../../../types/graphql.d";
import { UpdateRideStatusResponse } from "./../../../types/graphql.d";
import User from "./../../../entities/User";
import Ride from "./../../../entities/Ride";

const resolvers: Resolvers = {
  Mutation: {
    UpdateRideStatus: privatResolver(
      async (
        _,
        args: UpdateRideStatusMutationArgs,
        { req }
      ): Promise<UpdateRideStatusResponse> => {
        const user: User = req.user;
        if (user.isDriving) {
          try {
            let ride: Ride | undefined;
            if (args.status === "ACCEPTED") {
              ride = await Ride.findOne({
                id: args.rideId,
                status: "REQUESTING"
              });
              if (ride) {
                user.isTaken = true;
                user.save();
                ride.driver = user;
              }
            } else {
              ride = await Ride.findOne({
                id: args.rideId,
                driver: user
              });
            }
            if (ride) {
              ride.status = args.status;
              ride.save();
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "Cant update status"
              };
            }
          } catch (error) {
            return {
              ok: false,
              error: error.message
            };
          }
        } else {
          return {
            ok: false,
            error: "you are not driving"
          };
        }
      }
    )
  }
};

export default resolvers;
