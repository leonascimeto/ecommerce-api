import Checkout, { Input } from "../src/Checkout";
import CouponRespository from "../src/CouponRepository";
import CouponRepositoryDatabase from "../src/CouponRepositoryDatabase";
import ProductRepository from "../src/ProductRepository";
import ProductRepositoryDatabase from "../src/ProductRepositoryDatabase";

let checkout: Checkout

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

   const productRepository: ProductRepository = {
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

   const couponRepository : CouponRespository = {
      async get (code: string) : Promise<any>{
         return coupons[code];
      }
   }
   checkout = new Checkout(productRepository, couponRepository);
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
      coupon: "VALE20"
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