import {pbkdf2Sync, randomBytes} from "crypto"
import UserRepository from "../repository/UserRepository";
import UserRepositoryDatabase from "../../infra/repository/UserRepositoryDatabase";
import { sign } from "jsonwebtoken";
import TokenGenerator from "../../domain/entity/TokenGenerator";
export default class Signup {

   constructor() {
   }

   async execute(token: string): Promise<output>{
      const tokenGenerator = new TokenGenerator("secret");
      const output = tokenGenerator.verify(token);

      return {
         email: output.email
      }
   }
}

type output = {
   email: string;
}