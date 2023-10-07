import DatabaseRepositoryFactory from './infra/factory/DatabaseRepositoryFactory';
import UseCaseFactory from './infra/factory/UseCaseFactory';
import ExpressAdpter from './infra/http/ExpressAdpter';
import HttpController from './infra/http/HttpController';

const repositoryFactory = new DatabaseRepositoryFactory();
const useCaseFactory = new UseCaseFactory(repositoryFactory);
const httpServer = new ExpressAdpter();
new HttpController(httpServer, useCaseFactory);
httpServer.listen(3004);