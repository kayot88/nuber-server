import { Resolvers } from "src/types/resolvers";
import { privatResolver } from "./../../../utils/privatResolver";
import {
  SendMessageResponse,
  SendMessageMutationArgs
} from "src/types/graphql";
import User from "./../../../entities/User";
import Chat from "./../../../entities/Chat";
import Message from "./../../../entities/Message";
const resolvers: Resolvers = {
  Mutation: {
    SendMessage: privatResolver(
      async (
        _,
        args: SendMessageMutationArgs,
        { req, pubSub }
      ): Promise<SendMessageResponse> => {
        const user: User = req.user;
        try {
          const chat = await Chat.findOne({ id: args.chatId });
          if (
            (chat && chat.passengerId === user.id) ||
            (chat && chat.driverId === user.id)
          ) {
            const message = await Message.create({
              text: args.text,
              chatId: args.chatId
            }).save();
            pubSub.publish("sendMessage", { MessageSubsc: message });
            return {
              ok: true,
              error: null,
              message
            };
          } else {
            return {
              ok: false,
              error: "You not authorized or such chatroom is not found",
              message: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            message: null
          };
        }
      }
    )
  }
};

export default resolvers;
