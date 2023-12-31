import Order from "../../src/domain/entity/Order";
import crypto from "crypto";
import Product from "../../src/domain/entity/Product";
import Coupon from "../../src/domain/entity/Coupon";

test("Não deve criar um pedido com cpf inválido", () => {
   const orderId = crypto.randomUUID();
   const cpf = "123.456.789-00";
   expect(() => new Order(orderId, cpf)).toThrow("Invalid CPF");
});

test("Deve criar um pedido vazio", () => {
   const orderId = crypto.randomUUID();
   const cpf = "407.302.170-27";
   const order = new Order(orderId, cpf);
   expect(order.getTotal()).toBe(0);
});

test("Deve criar um pedido com 3 items", () => {
   const orderId = crypto.randomUUID();
   const cpf = "407.302.170-27";
   const order = new Order(orderId, cpf);
   order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3), 1);
   order.addItem(new Product(2, "B", 5000, 50, 50, 50, 22), 1);
   order.addItem(new Product(3, "C", 30, 10, 10, 10, 0.9), 3);
   expect(order.getTotal()).toBe(6090);
});

test("Não deve adicionar item repetido", () => {
   const orderId = crypto.randomUUID();
   const cpf = "407.302.170-27";
   const order = new Order(orderId, cpf);
   order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3), 1);
   expect(() => order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3), 1)).toThrow("Duplicated item");
});

test("Deve criar um pedido e gerar codigo", () => {
   const orderId = crypto.randomUUID();
   const cpf = "407.302.170-27";
   const order = new Order(orderId, cpf, new Date("2023-03-01T10:00:00"), 1);
   expect(order.code).toBe("202300000001");
});

test("Deve criar um pedido com 3 items com cupon de desconto", () => {
   const orderId = crypto.randomUUID();
   const cpf = "407.302.170-27";
   const order = new Order(orderId, cpf);
   order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3), 1);
   order.addItem(new Product(2, "B", 5000, 50, 50, 50, 22), 1);
   order.addItem(new Product(3, "C", 30, 10, 10, 10, 0.9), 3);
   order.addCoupon(new Coupon("VALE20", 20, new Date("2023-12-01T10:00:00")));
   expect(order.getTotal()).toBe(4872);
});