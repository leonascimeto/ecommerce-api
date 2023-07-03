import express, { Request, Response } from 'express';
import { validate } from './validateCpf';
import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.post('/checkout', async (req: Request, res: Response) => {
   try {
      const payload = req.body;
      console.log({payload});
      if(!validate(payload.cpf)) res.json({ message: "Invalid cpf" });
      const output = {
         total: 0
      }
      
      if(!payload.items) res.json({ message: "Invalid items" });

      const itemIds = payload.items.map(item => item.idProduct);
      const uniqueItems = new Set(itemIds);
      if(uniqueItems.size !== itemIds.length) res.json({ message: "Same item more than once" });


      for(const item of payload.items) {
         const productData = await prisma.product.findUnique({
            where: {
               id_product: item.idProduct
            }
         });
   
         const price = productData.price;
         const quantity = item.quantity || 0;
         const width = item.width || 0;
         const height = item.height || 0;
         const length = item.length || 0;
         const weight = item.weight || 0;

         if(quantity < 0) res.json({ message: "Invalid quantity" });
         if(width < 0 || height < 0 || length < 0) res.json({ message: "Invalid dimensions" });
         if(weight < 0) res.json({ message: "Invalid weight" });

         const fretePrice = 0; // TODO calcular o frete

         output.total += price * item.quantity;
         console.log({sum: output.total});
      }
   
      if(payload.coupon) {
         const couponData = await prisma.coupon.findUnique({
            where: {
               code: payload.coupon
            }
         });
         
         console.log({couponData});



         if(couponData.expire_date < new Date()) res.json({ message: "Coupon expired" });
         output.total -= (output.total * couponData.percentage) / 100;
      }
   
      res.json({ message: "Order created", total: output.total});
      
   } catch (error) {
      console.log(error);
   }
});

app.get('/', async (req: Request, res: Response) => {
   res.json({ message: "App is Running" });
})

app.listen(3000, () => console.log('Server is running'));