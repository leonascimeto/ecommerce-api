import Cpf from "../src/Cpf";

test("Deve criar um cpf valido", () => {
   const cpf = new Cpf("407.302.170-27");
   expect(cpf).toBeDefined();
});

test("Não deve criar um cpf invalido", () => {
   expect(() => new Cpf("123.456.789-00")).toThrow("Invalid CPF");
});