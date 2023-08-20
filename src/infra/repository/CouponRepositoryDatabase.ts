import { PrismaClient } from '@prisma/client';
import CouponRespository from '../../application/repository/CouponRepository';
import Coupon from '../../domain/entity/Coupon';
const prisma = new PrismaClient();

export default class CouponRepositoryDatabase implements CouponRespository {
    async get(code: string) {
      const  coupon =  await prisma.coupon.findUnique({
         where: {
               code
         }
      });

      return new Coupon(coupon.code, coupon.percentage, coupon.expire_date);
    }
}