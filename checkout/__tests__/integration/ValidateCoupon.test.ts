import ValidateCoupon from "../../src/application/usecase/ValidateCoupon";
import CouponRepositoryDatabase from "../../src/infra/repository/CouponRepositoryDatabase";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import {beforeEach, test, expect} from "@jest/globals";

let validateCoupon: ValidateCoupon

beforeEach(() => {
   const repositoryFactory = new DatabaseRepositoryFactory();
   validateCoupon = new ValidateCoupon(repositoryFactory);
});

test("Deve validar o cupom de desconto válido", async function () {
   const input = "VALE20";
   const couponRepository = new CouponRepositoryDatabase();
   const output = await validateCoupon.execute(input);
   expect(output.isValid).toBe(true);
});

test("Deve validar o cupom de desconto expirado", async function () {
   const input = "VALE10";
   const couponRepository = new CouponRepositoryDatabase();
   const output = await validateCoupon.execute(input);
   expect(output.isValid).toBe(false);
});
