import Coupon from "../../domain/entity/Coupon";

export default interface CouponRespository {
   get(code: string): Promise<Coupon>;
}
