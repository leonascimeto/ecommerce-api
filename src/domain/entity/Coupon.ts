export default class Coupon {
   constructor(readonly code: string, readonly percentage: number, readonly expireDate: Date) {
   }

   isValid(today: Date) {
      return this.expireDate.getTime() >= today.getTime();
   }

   calculaeDiscount(value: number) {
      return value * (this.percentage / 100);
   }
}