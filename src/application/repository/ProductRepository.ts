import Product from "../../domain/entity/Product";

export default interface ProductRepository {
   list(): Promise<Product[]>;
   get(id: number): Promise<Product>;
}