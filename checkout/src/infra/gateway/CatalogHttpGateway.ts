import Product from "../../domain/entity/Product";
import CatalogGateway from "../../application/gateway/CatalogGateway";
import HttpClient from "../http/HttpClient";
export default class CatalogHttpGateway implements CatalogGateway {
   constructor(readonly httpClient: HttpClient) {
   }

   async getProduct(idProduct: number): Promise<Product> {
      const product = await this.httpClient.get(`http://localhost:3001/products/${idProduct}`);
      const output = new Product(product.id, product.name, product.price, product.width, product.height, product.length, product.weight);
      return output;
   }
      
}