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
routes.post('/appointment',AppointmeentController.Store);
routes.get('/appointment',AppointmeentController.FindAll);
routes.get('/appointment/user/:id',AppointmeentController.FindByUser);
routes.get('/appointment/company/:id',AppointmeentController.FindByCompany);
routes.delete('/appointment/:id',AppointmeentController.Delete);
export default routes;
