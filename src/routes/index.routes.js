import { Router } from 'express';

const route = new Router();

route.get('/', (req,res) => {
    
    return res.json({message: "API - Service Provision"})
});

module.exports = route;