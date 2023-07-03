import axios from "axios";

const checkoutUrl = "http://localhost:3000/checkout";

test("Não deve criar pedido com cpf inválido", async () => {
   const payload = {
      cpf: "123.456.789-00"
   }

   const response = await axios.post(checkoutUrl, payload)
   const output = response.data;
   expect(output.message).toBe("Invalid cpf");
});

test("deve fazer um pedido com 3 items", async () => {
   const payload = {
      cpf: "407.302.170-27",
      items: [
         { idProduct: 1, quantity: 1 },
         { idProduct: 2, quantity: 1 },
         { idProduct: 3, quantity: 3 }
      ]
   }

   const response = await axios.post(checkoutUrl, payload)
   const output = response.data;
   expect(output.message).toBe("Order created");
   expect(output.total).toBe(6090);
});


test("deve fazer um pedido com 3 items com cupon de desconto", async () => {
   const payload = {
      cpf: "407.302.170-27",
      items: [
         { idProduct: 1, quantity: 1 },
         { idProduct: 2, quantity: 1 },
         { idProduct: 3, quantity: 3 }
      ],
      coupon: "VALE20"
   }

   const response = await axios.post(checkoutUrl, payload)
   const output = response.data;
   expect(output.message).toBe("Order created");
   expect(output.total).toBe(6090 * 0.8);
});



test("Não deve aplicar um cupom de desconto expirado", async () => {
   const payload = {
      cpf: "407.302.170-27",
      items: [
         { idProduct: 1, quantity: 1 },
         { idProduct: 2, quantity: 1 },
         { idProduct: 3, quantity: 3 }
      ],
      coupon: "VALE10"
   }

   const response = await axios.post(checkoutUrl, payload)
   const output = response.data;
   expect(output.message).toBe("Coupon expired");
})

test("Quantidade de produtos não deve ser negativa", async() => {
   const payload = {
      cpf: "407.302.170-27",
      items: [
         { idProduct: 1, quantity: -1 },
         { idProduct: 2, quantity: 1 },
         { idProduct: 3, quantity: 3 }
      ]
   }

   const response = await axios.post(checkoutUrl, payload)
   const output = response.data;
   expect(output.message).toBe("Invalid quantity");
})

test("Não deve ser informado o mesmo item mais de yma vez", async() => {
   const payload = {
      cpf: "407.302.170-27",
      items: [
         { idProduct: 1, quantity: 1 },
         { idProduct: 1, quantity: 1 },
         { idProduct: 3, quantity: 3 }
      ]
   }

   const response = await axios.post(checkoutUrl, payload)
   const output = response.data;
   expect(output.message).toBe("Same item more than once");
})

test("Não deve informar dimensões negativas", async () => {
   const payload = {
      cpf: "407.302.170-27",
      items: [
         { idProduct: 1, quantity: 1, width: -1, height: 1, length: 1 },
         { idProduct: 2, quantity: 1, width: 1, height: -1, length: 1 },
         { idProduct: 3, quantity: 3, width: 1, height: 1, length: -1 }
      ]
   }

   const response = await axios.post(checkoutUrl, payload)
   const output = response.data;
   expect(output.message).toBe("Invalid dimensions");
})

test("O peso não deve ser negativo", async () => {
   const payload = {
      cpf: "407.302.170-27",
      items: [
         { idProduct: 1, quantity: 1, weight: -1 },
         { idProduct: 2, quantity: 1, weight: 1 },
         { idProduct: 3, quantity: 3, weight: 1 }
      ]
   }

   const response = await axios.post(checkoutUrl, payload)
   const output = response.data;
   expect(output.message).toBe("Invalid weight");
})