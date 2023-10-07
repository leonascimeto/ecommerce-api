import User from "../../../src/domain/entity/User";

export default interface UserRepository{
   save(user: any): Promise<void>;
   get(email: string): Promise<User>;
}