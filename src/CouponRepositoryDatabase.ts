import { PrismaClient } from '@prisma/client';
import CouponRespository from './CouponRepository';
const prisma = new PrismaClient();

export default class CouponRepositoryDatabase implements CouponRespository {
    async get(code: string) {
        return await prisma.coupon.findUnique({
            where: {
                code
            }
        });
    }
}