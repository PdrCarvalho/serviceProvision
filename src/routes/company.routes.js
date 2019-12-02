import { Router } from 'express';
import CompanyController from '../app/controller/CompanyController';

const route = new Router();

route.post('/',CompanyController.Store);
route.get('/', CompanyController.FindAll);

module.exports = route;