import { Router } from 'express';
import AppointmeentController from '../app/controller/AppointmentController';

const route = new Router();

route.post('/', AppointmeentController.Store);
route.get('/', AppointmeentController.FindAll);
route.get('/user/:id', AppointmeentController.FindByUser);
route.get('/company/:id', AppointmeentController.FindByCompany);
route.delete('/:id', AppointmeentController.Delete);

module.exports = route;
