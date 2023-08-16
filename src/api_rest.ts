import express, { Request, Response } from 'express';
import {PrismaClient} from '@prisma/client'
import Checkout from './Checkout';
import DatabaseRepositoryFactory from './DatabaseRepositoryFactory';
const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.post('/checkout', async (req: Request, res: Response) => {
   const repositoryFactory = new DatabaseRepositoryFactory();
   const checkout = new Checkout(repositoryFactory);
   try {
      const output = await checkout.execute(req.body);   
      res.json(output);
   } catch (error) {
      console.error(error);
      res.status(422).json({ message: error.message });
   }
});

app.get('/', async (req: Request, res: Response) => {
   res.json({ message: "App is Running" });
})

app.listen(3000, () => console.log('Server is running'));