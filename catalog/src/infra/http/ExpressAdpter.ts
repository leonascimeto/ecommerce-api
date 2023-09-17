import HttpServer from "./HttpServer";
import express, { Request, Response } from 'express';

export default class ExpressAdpter implements HttpServer {
   app: any;
   constructor() {
      this.app = express();
      this.app.use(express.json());
   }
   
   on(method: string, path: string, callback: Function): void {
      this.app[method](path, async (req: Request, res: Response) => {
         try {
            const output = await callback()
            res.send(output);
         } catch (error) {
            res.status(422).json({ message: error.message });
         }
      });
   }

   listen(port: number): void {
      this.app.listen(port);
   }

}