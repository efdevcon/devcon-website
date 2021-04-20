import express, { Request, Response } from 'express';
import serverless from 'serverless-http';
import * as defaultRoutes from '../routes/routes';

const server = express();
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).send('Service up and running!');
});

defaultRoutes.register(router);

server.use(express.json());
server.use(express.urlencoded());
server.use('/.netlify/functions/api', router);

export const handler = serverless(server);