# serviceProvision
instalar dependencias: *npm install* ou *yarn*

Subir os dois bancos:

docker run -p  27017:27017  -d mongo

docker run -d -p 6379:6379 -i -t redis:3.2.5-alpine

Startar a api de principal(em um terminal só para ela):

*npm dev* ou *yarn dev*

Startar o microserviço de envio de email(em um terminal só para ele):

*npm queue* ou *yarn queue*

Documentação improvisada das rotas:

https://documenter.getpostman.com/view/7335439/SWDzdgFV?version=latest#6020aca3-5097-4887-898f-b7d7412430c4
