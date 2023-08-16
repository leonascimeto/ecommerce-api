import sinon from "sinon";
import Checkout from "../src/Checkout";
import ProductRepositoryDatabase from "../src/ProductRepositoryDatabase";
import crypto from "crypto";
import GetOrder from "../src/GetOrder";
import Product from "../src/Product";
import DatabaseRepositoryFactory from "../src/DatabaseRepositoryFactory";
import RepositoryFactory from "../src/RepositoryFactory";

let checkout: Checkout
let getOrder: GetOrder
let repositoryFactory: RepositoryFactory

beforeEach(async () => {
	repositoryFactory = new DatabaseRepositoryFactory();
	checkout = new Checkout(repositoryFactory);
	getOrder = new GetOrder(repositoryFactory);
});

test("Não deve criar pedido com cpf inválido", async () => {
   const input = {
      cpf: "123.456.789-00",
      items: []
   }

   expect(() => checkout.execute(input)).rejects.toThrow("Invalid CPF");
});

test("deve fazer um pedido com 3 items", async () => {
   const input = {
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
   expect(output.freight).toBe(280);
   expect(output.total).toBe(6370);
})

test("deve fazer um pedido com 1 items com stub", async () => {
   const productRepositoryStub = sinon.stub(ProductRepositoryDatabase.prototype, "get").resolves(new Product(1, "A", 100, 1, 1, 1, 1));
   const input = {
      cpf: "407.302.170-27",
      items: [
         { idProduct: 1, quantity: 1 },
      ],
   }
   const output = await checkout.execute(input)
   expect(output.total).toBe(100);
   productRepositoryStub.restore();
});

test("deve fazer um pedido usando um mock", async () => {
   const productRepositoryMock = sinon.mock(ProductRepositoryDatabase.prototype);
   productRepositoryMock.expects("get").once().resolves(new Product(1, "A", 100, 1, 1, 1, 1));

   const input = {
      cpf: "407.302.170-27",
      items: [
         { idProduct: 1, quantity: 1 },
      ],
      email: "carlos@email.com",
   }
   const output = await checkout.execute(input)
   expect(output.total).toBe(100);
   productRepositoryMock.verify();
   productRepositoryMock.restore();
});

test("deve fazer um pedido com 3 items e retornar o registro da ordem do pedido", async () => {
   const idOrder = crypto.randomUUID();
   const input = {
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
   const orderRepository = repositoryFactory.createOrderRepository();
   await orderRepository.clear();
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
   const input = {
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
