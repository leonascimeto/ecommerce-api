import Coupon from "../../src/domain/entity/Coupon";

test("deve validar se o cupom é valido", () => {
   const coupon = new Coupon("VALE20", 20, new Date("2023-11-15T08:30:00"));
   expect(coupon.isValid(new Date("2023-07-15T08:30:00"))).toBe(true);
});

test("deve validar se o cupom é invalido", () => {
   const coupon = new Coupon("VALE20", 20, new Date("2023-11-15T08:30:00"));
   expect(coupon.isValid(new Date("2023-12-15T08:30:00"))).toBe(false);
});

test("deve calcular o desconto do cupom", () => {
   const coupon = new Coupon("VALE20", 20, new Date("2023-11-15T08:30:00"));
   const total = 1000;
   expect(coupon.calculaeDiscount(total)).toBe(200);
});