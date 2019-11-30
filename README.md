# service Provision
API de prestação de serviços. Basicamente, a ideia é que um usuário consiga se cadastrar na plataforma, visualizar as empresas e os serviços que elas prestam e agendar um atendimento para a execução do serviço desejado com a empresa escolhida. Ademais, sempre que um novo agendamente for efetivado, a empresa da qual ele for direcionado, deve receber um e-mail com as informações do agendamento.

# Aplicação
Utilizamos o NodeJS com express para criar a API baseada no padrão REST. Utilizamos o MongoDB  para armazenar as informações de usuário, empresa e agendamento. O redis foi utilizado para armazenar a fila de empresas a serem notificadas, após o cadastro de um novo agendamento. Quando algo é inserido na fila, a aplicação é notificada e o processamento de email é inicializado.


# Endpoints
* /user
	* GET: Retorna todos os usuários presentes no banco de dados.
    * POST: Adiciona o usuário passado no body ao banco de dados.
* /company
    * GET: Retorna todas as empresas presentes no banco de dados.
    * POST: Adiciona a empresa passada no body ao banco de dados.
* /appointment
    * GET: Retorna todos os serviços presentes no banco de dados.

docker run -p  27017:27017 -v /home/carvalho/data:/data/db -d mongo
docker run -d -p 6379:6379 -i -t redis:3.2.5-alpine
