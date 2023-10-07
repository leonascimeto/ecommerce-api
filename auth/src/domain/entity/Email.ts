export default class Email {
   value: string;
   constructor(email: string) {
      if(!this.isValid(email)) throw new Error("Invalid email");
      this.value = email;
   }

   isValid(email: string){
      return String(email).toLowerCase().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/);
   }
}