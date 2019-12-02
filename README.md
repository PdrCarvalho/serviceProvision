
# Service Provision
API de prestação de serviços. Basicamente, a ideia é que um usuário consiga se cadastrar na plataforma, visualizar as empresas e os serviços que elas prestam e agendar um atendimento para a execução do serviço desejado com a empresa escolhida. Ademais, sempre que um novo agendamente for efetivado, a empresa da qual ele for direcionado, deve receber um e-mail com as informações do agendamento.

# Aplicação
Para o desenvolvimento dessa solução utilizamos o NodeJS com express para criar a API baseada no padrão REST e os bancos de dados não relacionais MongoDB e Redis. Esse primeiro banco foi utilizado para o armazenamento de todas as informações cadastradas no sistema, como os usuários, empresas e os agendamentos. Escolhemos o MongoDB porque estudamos a ferramenta durante a disciplina e gostaríamos de colocar em prática os conhecimento adquiridos. Já o segundo foi utilizado pela biblioteca Bee-Queue para o gerenciamento do serviço de envio de e-mail, armazenando em fila os agendamentos cadastrados no sistema com as empresas que devem ser notificadas.


# Modelos de Requisição
### User
```bson
{
	"name" : <nome do usuário> : string,
	"email" : <email do usuário> : string,
	"password" : <senha do usuário> : string,
	"address" : {
		"street" : <nome da rua> : string,
		"number" : <número do local> : string,
		"city" : <nome da cidade> : string,
		"state" : <nome do estado> : string
	}
}
```
### Company
```bson
{
   	"name" : <nome da empresa> : string,
	"email" : <email da empresa> : string,
	"password" : <senha da empresa> : string,
	"service" : <serviço prestado pela empresa> string,
	"description" : <descrição do serviço prestado> string,
	"address" : {
		"street" : <nome da rua> : string,
		"number" : <número do local> : string,
		"city" : <nome da cidade> : string,
		"state" : <nome do estado> : string
	}
}
```

### Appointment
```bson
{
   	"user" : <id do usuário> : string,
	"company" : <id da empresa> : string,
	"date" : <data para a realização do serviço> : string
}
```

# Endpoints
* /user
	* **GET**: Retorna todos os usuários presentes no banco de dados.
	* **POST**: Armazena o usuário passado no body ao banco de dados.
* /company
	* **GET**: Retorna todas as empresas presentes no banco de dados.
    * **POST**: Armazena a empresa passada no body ao banco de dados.
* /appointment
    * **GET**: Retorna todos os agendamentos presentes no banco de dados.
    * **POST**: Armazena o agendamento passado no body ao banco de dados. 
* /appointment/user/{idUser}
	* **GET**: Retorna os agendamentos solicitados pelo usuário com id passado por parâmetro.
* /appointment/company/{idCompany}
	* **GET**: Retorna os agendamentos solicitados para a empresa com id passado por parâmetro.

# Executando o Projeto
#### Download das dependências
```console
npm install 
```
#### Configuração das variáveis
**MongoDB:** Para alterar a url do MongoDB, é necessário alterar a url informada no método **mongo()** no arquivo **app.js**. <br />
**Redis:** Para alterar a url do Redis, é necessário alterar os valores no arquivo **config/redis.js**.<br />
**Express:** Para alterar a porta em que o express vai executar, é necessário alterar o valor no arquivo **server.js**.<br />
**Email:** Para alterar as informações sobre o serviço de email, é necessário alterar o arquivo **config/mail.js**.<br />

#### Inicializando a API
```console
yarn dev 
```
#### Inicializando o serviço de Email
```console
yarn queue 
```
