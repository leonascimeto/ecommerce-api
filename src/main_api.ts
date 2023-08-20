import Checkout from './application/usecase/Checkout';
import DatabaseRepositoryFactory from './infra/factory/DatabaseRepositoryFactory';
import ExpressAdpter from './infra/http/ExpressAdpter';
import HttpController from './infra/http/HttpController';

const repositoryFactory = new DatabaseRepositoryFactory();
const checkout = new Checkout(repositoryFactory);
const httpServer = new ExpressAdpter();
new HttpController(httpServer, checkout);
httpServer.listen(3000);