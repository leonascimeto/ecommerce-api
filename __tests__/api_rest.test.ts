import axios from "axios";
axios.defaults.validateStatus = function () {
	return true;
}

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
   expect(output.total).toBe(6090);
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
   expect(response.status).toBe(422);
   expect(output.message).toBe("Invalid quantity");
})

test("Não deve ser informado o mesmo item mais de uma vez", async() => {
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
   expect(response.status).toBe(422);
   expect(output.message).toBe("Duplicated item");
})

test("deve fazer um pedidio com 3 itens calculando o frete com preço minimo", async () => {
   const payload = {
      cpf: "407.302.170-27",
      items: [
         { idProduct: 1, quantity: 1},
         { idProduct: 2, quantity: 1},
         { idProduct: 3, quantity: 3},
      ],
      from: "88015600",
      to: "22030060",
   }

   const response = await axios.post(checkoutUrl, payload)
   const output = response.data;
   expect(output.subtotal).toBe(6090);
   expect(output.freight).toBe(280);
   expect(output.total).toBe(6370);
})



test("Não deve informar dimensões negativas", async () => {
   const payload = {
      cpf: "407.302.170-27",
      items: [
         { idProduct: 4, quantity: 1 },
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
         { idProduct: 5, quantity: 1 },
      ]
   }

   const response = await axios.post(checkoutUrl, payload)
   const output = response.data;
   expect(output.message).toBe("Invalid weight");
})
