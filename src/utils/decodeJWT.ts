import jwt from "jsonwebtoken";
// import { User } from "./../types/graphql.d";
import User from "./../entities/User";

const decodeJWT = async (token: string): Promise<User | undefined> => {
  try {
    const decoded: any = await jwt.verify(token, process.env.JWT_TOKEN || "");
    const { id } = decoded;
    const findedUser = await User.findOne({ id });
    // console.log(findedUser);
    return findedUser;
  } catch (error) {
    return undefined;
  }
};
export default decodeJWT;
