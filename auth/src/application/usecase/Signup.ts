import {pbkdf2Sync, randomBytes} from "crypto"
import UserRepository from "../repository/UserRepository";
import User from "../../../src/domain/entity/User";
import UserRepositoryDatabase from "../../../src/infra/repository/UserRepositoryDatabase";
export default class Signup {
   constructor(readonly userRepository: UserRepository = new UserRepositoryDatabase()) {
   }

   async execute(input: Input): Promise<void>{
      const user = User.create(input.email, input.password);
      await this.userRepository.save(user);
   }
}

type Input = {
   email: string;
   password: string;
}