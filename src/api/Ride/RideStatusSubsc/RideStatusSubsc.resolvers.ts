import { withFilter } from "graphql-yoga";
import User from "./../../../entities/User";

const resolvers = {
  Subscription: {
    RideStatusSubscr: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("rideUpdate"),
        (payload, _, { connectionContext }) => {
          const user: User = connectionContext.currentUser;
          const {
            RideStatusSubscr: { driverId, passengerId }
          } = payload;
          return user.id === driverId || user.id === passengerId;
        }
      )
    }
  }
};

export default resolvers;
