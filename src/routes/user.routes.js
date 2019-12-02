import { Router } from 'express';
import UserController from '../app/controller/UserController';

const route = new Router();

route.post('/', UserController.Store);
route.get('/', UserController.FindAll);

module.exports = route;