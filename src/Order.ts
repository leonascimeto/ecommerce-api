import Cpf from "./Cpf";
import Item from "./Item";
import Product from "./Product";

export default class Order {
   private cpf: Cpf
   items: Item[]
   constructor(readonly idOrder: string, cpf: string){
      this.cpf = new Cpf(cpf)
      this.items = []
   }

   getTotal() {
      let total = 0;
      for (const item of this.items) {
         total += item.getTotal()
      }
      return total
   }
   
   addItem(product: Product, quantity: number) {
      if(this.items.some(item => item.idProduct === product.id)) throw new Error("Duplicated item")
      this.items.push(new Item(product.id, quantity, product.price))
   }
}