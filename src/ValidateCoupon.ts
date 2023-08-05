import CouponRespository from "./CouponRepository";
import CouponRepositoryDatabase from "./CouponRepositoryDatabase";

export default class ValidateCoupon {
   constructor(readonly couponRepository: CouponRespository = new CouponRepositoryDatabase()){}

   async execute(code: string): Promise<Output> {
      const output = {
         isValid: false,
      }
      const coupon = await this.couponRepository.get(code);
      if(!coupon) return output;
      const today = new Date();
      output.isValid = coupon.isValid(today);
      return output;
   }

}

type Output = {
   isValid: boolean,
}