import 'reflect-metadata';
import express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './container';  
import './auth/auth.controller';
import './users/user.controller'
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger'; 
import { AppDataSource } from './config'; 

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

const server = new InversifyExpressServer(container);


server.setConfig((app) => {
  app.use(express.json());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
});


const appInstance = server.build();


appInstance.listen(3000, () => {
  console.log('Server started on port 3000');
});
