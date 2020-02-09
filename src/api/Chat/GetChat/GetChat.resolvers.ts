import { Resolvers } from "src/types/resolvers";
import { privatResolver } from "./../../../utils/privatResolver";
import { GetChatQueryArgs, GetChatResponse } from "./../../../types/graphql.d";
import User from "./../../../entities/User";
import Chat from "./../../../entities/Chat";
const resolvers: Resolvers = {
  Query: {
    GetChat: privatResolver(
      async (_, args: GetChatQueryArgs, { req }): Promise<GetChatResponse> => {
        const user: User = req.user;
        try {
          const chat = await Chat.findOne(
            {
              id: args.chatId
            },
            { relations: ["messages"] }
          );

          if (
            (chat && chat.passengerId === user.id) ||
            (chat && chat.driverId === user.id)
          ) {
            return {
              ok: true,
              error: null,
              chat
            };
          } else {
            return {
              ok: false,
              error: "Not authorized or not find such chatroom",
              chat: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            chat: null
          };
        }
      }
    )
  }
};

export default resolvers;
