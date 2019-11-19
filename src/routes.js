import { Router } from 'express';

import UserController from './app/controller/UserController';
import CompanyController from './app/controller/CompanyControllee';
import AppointmeentController from './app/controller/AppointmentController';
const routes = new Router();

routes.get('/',(req,res)=>{
    return res.json({msg: "msg"})
})
routes.post('/user',UserController.Store);
routes.get('/user',UserController.FindAll);
routes.post('/company',CompanyController.Store);
routes.get('/company', CompanyController.FindAll);
routes.post('/appoitment',AppointmeentController.Store);
routes.get('/appoitment',AppointmeentController.FindAll);
export default routes;
