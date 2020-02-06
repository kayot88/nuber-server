import { Resolvers } from 'src/types/resolvers';
import { privatResolver } from './../../../utils/privatResolver';
import { ReportMovementMutationArgs, ReportMovementResponse } from './../../../types/graphql.d';
import User from './../../../entities/User';
import cleanArgsNull from './../../../utils/cleanArgsNull';

const resolvers: Resolvers = {
  Mutation: {
    ReportMovement: privatResolver(async (_, args: ReportMovementMutationArgs, {req, pubSub}):Promise<ReportMovementResponse> =>   {
      const user:User = req.user
      const notNull = cleanArgsNull(args)
      try {
        await User.update({id: user.id}, {...notNull})
        const updatetUser = await User.findOne({id: user.id})
        pubSub.publish("driverUpdate", { DriverSubsc: updatetUser });
        return{
          ok: true,
          error: null
        }
      } catch (error) {
        return{
          ok:false,
          error:error.message
        }
      }
    })
  }
};

export default  resolvers