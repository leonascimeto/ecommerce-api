export default interface CouponRespository {
   get(code: string): Promise<any>;
}
