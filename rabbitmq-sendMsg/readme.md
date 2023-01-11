# Config information

- Rabbitmq
  - Mode : send message
  - Durable : true - Not lost data when restart rabbitmq server
  - Persistent : true
- Express

# How to run example ?

- Install package

`npm i`

- Run Rabbitmq server

`docker-compose up`

- Run server

`npm start`

- Run client

`node client_receive.js`

- Send request inside file "request.http"
