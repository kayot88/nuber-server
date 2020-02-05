const resolvers = {
  Subscription: {
    DriverSubsc: {
      subscribe: (_, __, { pubSub }) => {
        return pubSub.asyncIterator("driverUpdate");
      }
    }
  }
};

export default resolvers;
