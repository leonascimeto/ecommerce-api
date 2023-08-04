import Product from "./Product";

export default interface ProductRepository {
   get(id: number): Promise<Product>;
}