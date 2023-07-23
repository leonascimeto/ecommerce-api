import sinon from "sinon";
import Checkout, { Input } from "../src/Checkout";
import CouponRespository from "../src/CouponRepository";
import ProductRepository from "../src/ProductRepository";
import ProductRepositoryDatabase from "../src/ProductRepositoryDatabase";
import { EmailGatewayConsole } from "../src/EmailGatewayConsole";
import crypto from "crypto";
import GetOrder from "../src/GetOrder";
import OrderRepositoryDatabase from "../src/OrderRepositoryDatabase";
import { get } from "http";

let checkout: Checkout
let getOrder: GetOrder
let productRepository: ProductRepository
let couponRepository: CouponRespository
let orderRepository: OrderRepositoryDatabase

beforeEach(() => {
   const products: any = {
      1 : {
         idProduct: 1,
         description: "A",
         price: 1000,
         width: 100,
         height: 30,
         length: 10,
         weight: 3
      },
      2 : {
         idProduct: 2,
         description: "B",
         price: 5000,
         width: 50,
         height: 50,
         length: 50,
         weight: 22
      },
      3 : {
         idProduct: 3,
         description: "C",
         price: 30,
         width: 10,
         height: 10,
         length: 10,
         weight: 0.9
      },
      4 : {
         idProduct: 4,
         description: "D",
         price: 100,
         width: -10,
         height: -10,
         length: -10,
         weight: 1
      },
      5 : {
         idProduct: 5,
         description: "E",
         price: 100,
         width: 10,
         height: 10,
         length: 10,
         weight: -1
      }
   }

   productRepository = {
     async get (id: number) : Promise<any> {
         return products[id];
      }
   };

   const coupons: any = {
      "VALE20": {
         percentage: 20,
         expire_date: new Date('2030-05-30T03:00:00')
      },
      "VALE10": {
         percentage: 10,
         expire_date: new Date('2021-05-30T03:00:00')
      },
   }

   couponRepository = {
      async get (code: string) : Promise<any>{
         return coupons[code];
      }
   }
   checkout = new Checkout(productRepository, couponRepository);
   orderRepository = new OrderRepositoryDatabase();
   getOrder = new GetOrder(orderRepository);
});

test("Não deve criar pedido com cpf inválido", async () => {
   const input = {
      cpf: "123.456.789-00",
      items: []
   }

   expect(() => checkout.execute(input)).rejects.toThrow("Invalid cpf");
});

test("deve fazer um pedido com 3 items", async () => {
   const input: Input = {
      cpf: "407.302.170-27",
      items: [
         { idProduct: 1, quantity: 1 },
         { idProduct: 2, quantity: 1 },
         { idProduct: 3, quantity: 3 }
      ],
      email: "carlos@email.com"
   }
   const output = await checkout.execute(input)
   console.log(output)
   expect(output.total).toBe(6090);
});

test("deve fazer um pedido com 3 items com cupon de desconto", async () => {
   const input = {
      cpf: "407.302.170-27",
      items: [
         { idProduct: 1, quantity: 1 },
         { idProduct: 2, quantity: 1 },
         { idProduct: 3, quantity: 3 }
      ],
      coupon: "VALE20",
      date: new Date('2023-07-23T03:00:00')
   }
   const output = await checkout.execute(input)
   expect(output.total).toBe(6090 * 0.8);
});

test("Não deve aplicar um cupom de desconto expirado", async () => {
   const input = {
      cpf: "407.302.170-27",
      items: [
         { idProduct: 1, quantity: 1 },
         { idProduct: 2, quantity: 1 },
         { idProduct: 3, quantity: 3 }
      ],
      coupon: "VALE10"
   }

   const output = await checkout.execute(input)
   expect(output.total).toBe(6090);
})

test("Quantidade de produtos não deve ser negativa", async() => {
   const input = {
      cpf: "407.302.170-27",
      items: [
         { idProduct: 1, quantity: -1 },
         { idProduct: 2, quantity: 1 },
         { idProduct: 3, quantity: 3 }
      ]
   }

   expect(() => checkout.execute(input)).rejects.toThrow("Invalid quantity");
})

test("Não deve ser informado o mesmo item mais de uma vez", async() => {
   const input = {
      cpf: "407.302.170-27",
      items: [
         { idProduct: 1, quantity: 1 },
         { idProduct: 1, quantity: 1 },
         { idProduct: 3, quantity: 3 }
      ]
   }

   expect(() => checkout.execute(input)).rejects.toThrow("Duplicated item");
})

test("deve fazer um pedidio com 3 itens calculando o frete com preço minimo", async () => {
   const input = {
      cpf: "407.302.170-27",
      items: [
         { idProduct: 1, quantity: 1},
         { idProduct: 2, quantity: 1},
         { idProduct: 3, quantity: 3},
      ],
      from: "88015600",
      to: "22030060",
   }

   const output = await checkout.execute(input)
   expect(output.subtotal).toBe(6090);
   expect(output.freight).toBe(280);
   expect(output.total).toBe(6370);
})

test("Não deve informar dimensões negativas", async () => {
   const input = {
      cpf: "407.302.170-27",
      items: [
         { idProduct: 4, quantity: 1 },
      ]
   }

   expect(() => checkout.execute(input)).rejects.toThrow("Invalid dimensions");
})

test("O peso não deve ser negativo", async () => {
   const input = {
      cpf: "407.302.170-27",
      items: [
         { idProduct: 5, quantity: 1 },
      ]
   }

   expect(() => checkout.execute(input)).rejects.toThrow("Invalid weight");
})

test("deve fazer um pedido com 1 items com stub", async () => {
   const productRepositoryStub = sinon.stub(ProductRepositoryDatabase.prototype, "get").resolves({
      idProduct: 1,
      description: "A",
      price: 1000,
   });
   checkout = new Checkout();
   const input: Input = {
      cpf: "407.302.170-27",
      items: [
         { idProduct: 1, quantity: 1 },
      ],
   }
   const output = await checkout.execute(input)
   console.log(output)
   expect(output.total).toBe(1000);
   productRepositoryStub.restore();
});

test("deve fazer um pedido usando um mock", async () => {
   const productRepositoryMock = sinon.mock(ProductRepositoryDatabase.prototype);
   productRepositoryMock.expects("get").once().resolves({
      idProduct: 1,
      description: "A",
      price: 1000,
   });

   checkout = new Checkout();
   const input: Input = {
      cpf: "407.302.170-27",
      items: [
         { idProduct: 1, quantity: 1 },
      ],
      email: "carlos@email.com",
   }
   const output = await checkout.execute(input)
   expect(output.total).toBe(1000);
   productRepositoryMock.verify();
   productRepositoryMock.restore();
});

test("deve fazer um pedido com 3 items e retornar o registro da ordem do pedido", async () => {
   const idOrder = crypto.randomUUID();
   const input: Input = {
      idOrder,
      cpf: "407.302.170-27",
      items: [
         { idProduct: 1, quantity: 1 },
         { idProduct: 2, quantity: 1 },
         { idProduct: 3, quantity: 3 }
      ],
      email: "carlos@email.com"
   }
   await checkout.execute(input)
   const output = await getOrder.execute(idOrder);
   expect(output.total).toBe(6090)
});

test("deve fazer um pedido com 3 items e gerar código do pedido", async () => {
   await orderRepository.clear();
   checkout = new Checkout(productRepository, couponRepository, orderRepository);
   await checkout.execute({
      idOrder: crypto.randomUUID(),
      cpf: "407.302.170-27",
      items: [
         { idProduct: 1, quantity: 1 },
         { idProduct: 2, quantity: 1 },
         { idProduct: 3, quantity: 3 }
      ],
      email: "carlos@email.com"
   })
   const idOrder = crypto.randomUUID();
   const input: Input = {
      idOrder: idOrder,
      cpf: "407.302.170-27",
      items: [
         { idProduct: 1, quantity: 1 },
         { idProduct: 2, quantity: 1 },
         { idProduct: 3, quantity: 3 }
      ],
      email: "carlos@email.com",
      date: new Date('2023-05-30T03:00:00')
   }
   await checkout.execute(input)
   const output = await getOrder.execute(idOrder);
   expect(output.code).toBe("202300000002")

});
