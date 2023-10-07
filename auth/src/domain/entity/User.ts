import { pbkdf2Sync, randomBytes } from "crypto";
import Email from "./Email";
import Password from "./Password";

export default class User {

   private constructor(public email: Email, public password: Password) {
   }
   
   static create(email: string, password: string): User {
      return new User(new Email(email), Password.create(password));
   }

   static restore(email: string, hash: string, salt: string): User {
      return new User(new Email(email), Password.restore(hash, salt));
   }

   updatePassword(password: string): void {
      this.password = Password.create(password);
   }

   validatePassword(){
      return this.password.validate(this.password.value);
   }
}