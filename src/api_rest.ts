import express, { Request, Response } from 'express';
import { validate } from './validateCpf';
import {PrismaClient} from '@prisma/client'
import Checkout from './Checkout';
const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.post('/checkout', async (req: Request, res: Response) => {
   try {
      const payload = req.body;
      console.log({payload});
      
      const chackout = new Checkout().execute(payload);
      res.json(chackout);
   } catch (error) {
      console.error(error);
      res.status(422).json({ message: error.message });
   }
});

app.get('/', async (req: Request, res: Response) => {
   res.json({ message: "App is Running" });
})

app.listen(3000, () => console.log('Server is running'));