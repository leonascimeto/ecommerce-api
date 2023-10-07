import {pbkdf2Sync, randomBytes} from "crypto"
import UserRepository from "../repository/UserRepository";
import UserRepositoryDatabase from "../../infra/repository/UserRepositoryDatabase";
import { sign } from "jsonwebtoken";
import TokenGenerator from "../../domain/entity/TokenGenerator";
export default class Signup {
   constructor(readonly userRepository: UserRepository = new UserRepositoryDatabase()) {
   }

   async execute(input: Input): Promise<output>{
      const user = await this.userRepository.get(input.email);
      if(!user.validatePassword) throw new Error("Authentication failed");
      const tokenGenerator = new TokenGenerator("secret");

      return {token: tokenGenerator.sign(user, input.date)};
   }
}

type Input = {
   email: string;
   password: string;
   date: Date
}

type output = {
   token: string;
}