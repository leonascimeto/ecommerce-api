const input = {
   cpf: "",
   items: [],
}


process.stdin.on('data', (data) => {
   const command = data.toString().replace(/\n/g, '');
   
   if(command.startsWith("set-cpf")) {
      input.cpf = command.replace("set-cpf ", "");
      console.log(input)
      return;
   }
   if(command.startsWith("add-item")) {
      const [idProduct, quantity] = command.replace("add-item ", "").split(" ");
      input.items.push({ idProduct: parseInt(idProduct), quantity: parseInt(quantity) });
      console.log(input)
      return;
   }
   if(command.startsWith("checkout")) {
      console.log("Compra finalizada");
      return;
   }
   
   if(command.startsWith("quit")) {
      process.exit(0);
   }
   console.log("Comando inválido");
});