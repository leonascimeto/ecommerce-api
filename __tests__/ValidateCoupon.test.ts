import ValidateCoupon from "../src/ValidateCoupon";
import CouponRepositoryDatabase from "../src/CouponRepositoryDatabase";
import DatabaseRepositoryFactory from "../src/DatabaseRepositoryFactory";

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
