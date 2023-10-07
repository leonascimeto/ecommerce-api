import { pbkdf2Sync, randomBytes } from "crypto";

export default class Password{
   constructor(readonly value: string, readonly salt: string) {
   }
   
   static create(password: string) {
      const salt = randomBytes(20).toString("hex");
      const hash = password = pbkdf2Sync(password, salt , 64, 100, "sha512").toString("hex");
      return new Password(hash, salt);
   }

   static restore(password: string, salt: string) {
      return new Password(password, salt);
   }

   validate(password: string){
      const hash = pbkdf2Sync(password, this.salt , 64, 100, "sha512").toString("hex");
      return hash === this.value;
   }
}