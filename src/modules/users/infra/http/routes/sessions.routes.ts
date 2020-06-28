import { Router } from 'express';
// import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
// import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
// import { container } from 'tsyringe';

import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();

const sessionsController = new SessionsController();
// sessionsRouter.post('/', async (request, response) => {
//   const { email, password } = request.body;
//   // const usersRepository = new UsersRepository();
//   // const authentucate = new AuthenticateUserService(usersRepository);
//   const authentucate = container.resolve(AuthenticateUserService);

//   const { user, token } = await authentucate.execute({
//     email,
//     password,
//   });

//   delete user.password;
//   return response.json({ user, token });
// });

sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;
