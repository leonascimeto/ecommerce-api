import Coupon from "./Coupon";

export default interface CouponRespository {
   get(code: string): Promise<Coupon>;
}
