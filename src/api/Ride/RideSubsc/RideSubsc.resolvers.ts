import { withFilter } from "graphql-yoga";
import User from "./../../../entities/User";

const resolvers = {
  Subscription: {
    RideSubsc: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("rideRequest"),
        (payload, _, { connectionContext }) => {
          const user: User = connectionContext.currentUser;
          const {
            RideSubsc: { pickUpLat, pickUpLng }
          } = payload;
          const { lastLat: userLastLat, lastLng: userLastLng } = user;
          return (
            pickUpLat >= userLastLat - 0.05 &&
            pickUpLat <= userLastLat + 0.05 &&
            pickUpLng >= userLastLng - 0.05 &&
            pickUpLng <= userLastLng + 0.05
          );
          // return true;
        }
      )
    }
  }
};

export default resolvers;
