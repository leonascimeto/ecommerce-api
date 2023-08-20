import Item from "../../src/domain/entity/Item";
import Product from "../../src/domain/entity/Product";

test("Não deve criar um item com quantidade invalida", () => {
   expect(() => new Item(new Product(1, "A", 1000, 100, 30, 10, 3).id, 0, 0)).toThrow("Invalid quantity");
});