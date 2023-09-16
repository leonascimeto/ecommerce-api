export default class Item{
      constructor(readonly idProduct: number, readonly quantity: number, readonly price: number){
         if(quantity <= 0) throw new Error("Invalid quantity");
      }

      getTotal() {
         return this.quantity * this.price
      }
}