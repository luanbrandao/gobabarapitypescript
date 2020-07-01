import { Router } from 'express';
// import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
// import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
// import { container } from 'tsyringe';

import { celebrate, Segments, Joi } from 'celebrate';
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

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

export default sessionsRouter;
