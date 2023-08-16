import CouponRespository from "./CouponRepository";
import CouponRepositoryDatabase from "./CouponRepositoryDatabase";
import RepositoryFactory from "./RepositoryFactory";

export default class ValidateCoupon {
   couponRepository: CouponRespository;
   
   constructor(repositotyFactory: RepositoryFactory){
      this.couponRepository = repositotyFactory.createCouponRepository();
   }

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