import express from 'express';
import mongoose from 'mongoose';
import indexRoute from './routes/index.routes';
import userRoute from './routes/user.routes';
import companyRoute from './routes/company.routes';
import appointmentRoute from './routes/appointment.routes';

class App {
  constructor() {
    this.server = express();
    this.mongo();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use('/', indexRoute);
    this.server.use('/user', userRoute);
    this.server.use('/company', companyRoute);
    this.server.use('/appointment', appointmentRoute);
  }

  mongo(){
    this.mongoConnection = mongoose.connect('mongodb://localhost:27017/serviceProvision', { 
      useNewUrlParser: true, 
      useFindAndModify: true, 
      useUnifiedTopology: true 
    });
  }
}

export default new App().server;
