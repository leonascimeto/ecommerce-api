import DatabaseRepositoryFactory from './infra/factory/DatabaseRepositoryFactory';
import UseCaseFactory from './infra/factory/UseCaseFactory';
import AxiosAdapter from './infra/http/AxiosAdpter';
import ExpressAdpter from './infra/http/ExpressAdpter';
import HttpController from './infra/http/HttpController';
import GatewayHttpFactory from './infra/factory/GateWayHttpFactory'
const repositoryFactory = new DatabaseRepositoryFactory();
const httpClient = new AxiosAdapter();
const gateWayFactory = new GatewayHttpFactory(httpClient);
const useCaseFactory = new UseCaseFactory(repositoryFactory, gateWayFactory);
const httpServer = new ExpressAdpter();
new HttpController(httpServer, useCaseFactory);
httpServer.listen(3000);