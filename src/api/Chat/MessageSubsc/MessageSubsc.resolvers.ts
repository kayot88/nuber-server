import { withFilter } from "graphql-yoga";
import User from "./../../../entities/User";
import Chat from "./../../../entities/Chat";

const resolvers = {
  Subscription: {
    MessageSubsc: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("sendMessage"),
        async (payload, _, { connectionContext }) => {
          const user: User = connectionContext.currentUser;
          const {
            MessageSubsc: { chatId }
          } = payload;
          try {
            const chat = await Chat.findOne({ id: chatId });
            if (chat) {
              return chat.passengerId === user.id || chat.driverId === user.id;
            }
            return false;
          } catch (error) {
            return false;
          }
        }
      )
    }
  }
};

export default resolvers;
