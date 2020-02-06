import { withFilter } from "graphql-yoga";
import User from "./../../../entities/User";

const resolvers = {
  Subscription: {
    DriverSubsc: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("driverUpdate"),
        (payload, _, { connectionContext }) => {
          const user: User = connectionContext.currentUser;
          const {
            DriverSubsc: { lastLat: driverLastLat, lastLng: driverLastLng }
          } = payload;
          const { lastLat: userLastLat, lastLng: userLastLng } = user;
          return (
            driverLastLat >= userLastLat - 0.05 &&
            driverLastLat <= userLastLat + 0.05 &&
            driverLastLng >= userLastLng - 0.05 &&
            driverLastLng <= userLastLng + 0.05
          );
          // return true;
        }
      )
    }
  }
};

export default resolvers;
