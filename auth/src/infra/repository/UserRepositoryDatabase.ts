import { PrismaClient } from '@prisma/client';
import UserRepository from "../../application/repository/UserRepository";
import User from '../../../src/domain/entity/User';
const prisma = new PrismaClient();

export default class UserRepositoryDatabase implements UserRepository {
   async save(user: User): Promise<void> {
      await prisma.user.create({
         data: {
            email: user.email.value,
            password: user.password.value,
            salt: user.password.salt
         }
      });

   }
   async get(email: string): Promise<User> {
      const user = await prisma.user.findUnique({
         where: {
            email: email
         }
      });

      return User.restore(user.email, user.password, user.salt);
   }

}