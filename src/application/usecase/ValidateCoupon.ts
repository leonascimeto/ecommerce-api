import CouponRespository from "../repository/CouponRepository";
import CouponRepositoryDatabase from "../../infra/repository/CouponRepositoryDatabase";
import RepositoryFactory from "../repository/RepositoryFactory";

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