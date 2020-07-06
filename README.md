yarn add express
npm install @types/express -D
yarn add typescript -D
// gera o arquivo tsconfig.json
yarn tsc --init
// gera os arquivos js
yarn tsc
// funciona igual o nodemom
yarn add ts-node-dev -D

yarn add eslint -D
//ajuda na importação dos arquivos
yarn add -D eslint-import-resolver-typescript
yarn add prettier eslint-config-prettier eslint-plugin-prettier  -D
yarn add uuidv4
yarn add date-fns
yarn add typeorm pg

// anotações
yarn add reflect-metadata
yarn add bcryptjs
yarn add install @types/bcryptjs
yarn add jsonwebtoken
yarn add -D @types/jsonwebtoken
yarn add multer
yarn add -D @types/multer

 yarn add express-async-errors

 // infra - decisões técnicas
 // domínio - regras de negócios

// interpleta os '@'
yarn add tsconfig-paths -D

//SOLID
Single Responsability Principle
Open Closed Principle
Lisk Substitutions Princicle
Interface Segragation Principle
Dependency Invertion Principle

// injeção de dependencia
yarn add tsyringe

yarn add jest -D
yarn add ts-jest -D
yarn add @types/jest

yarn add cors
yarn add @types/cors -D


yarn add nodemailer
yarn add @types/nodemailer -D

<!-- templte de email -->
 yarn add handlebars

<!-- limpa p cache dos testes -->
yarn jest --clearCache

<!-- PostGres -->

docker start gostack_postgres


<!-- Mongo -->
docker run --name mongodb -p 27017:27017 -d -t mongo
docker start mongodb
yarn add mongodb
yarn add @types/mongodb -D


<!-- Validações -->
yarn add celebrate
yarn add @types/hapi__joi -D

<!-- variáveis de ambiente -->
yarn add dotenv

<!--  -->
yarn add class-transformer

<!-- Envio de email com AWS -->
yarn add aws-sdk

<!-- Upload de arquivos aws -->
yarn add mime

<!-- Redis -->
 docker run --name redis -p 6379:6379 -d -t redis:alpine
 docker start redis

yarn add ioredis
yarn add @types/ioredis -D


<!-- Segurança -->
Brute force
yarn add rate-limiter-flexible
yarn add redis
yarn add @types/redis
