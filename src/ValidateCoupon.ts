import CouponRespository from "./CouponRepository";
import CouponRepositoryDatabase from "./CouponRepositoryDatabase";

export default class ValidateCoupon {
   constructor(readonly couponRepository: CouponRespository = new CouponRepositoryDatabase()){}

   async execute(code: string): Promise<Output> {
      const output = {
         isValid: false,
      }
      const couponData = await this.couponRepository.get(code);
      const today = new Date();
      output.isValid = couponData && couponData.expire_date.getTime() > today.getTime();
      return output;
   }

}

type Output = {
   isValid: boolean,
}