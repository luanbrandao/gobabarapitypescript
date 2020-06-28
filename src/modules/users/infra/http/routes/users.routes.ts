import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
// import { container } from 'tsyringe';
// import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

// import Appointment from '../models/Appointment';
// import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const userRouter = Router();
const upload = multer(uploadConfig);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

// userRouter.post('/', async (request, response) => {
//   // const usersRepository = new UsersRepository();
//   const { name, email, password } = request.body;

//   // const createUser = new CreateUserService(usersRepository);
//   const createUser = container.resolve(CreateUserService);

//   const user = await createUser.execute({
//     name,
//     email,
//     password,
//   });

//   delete user.password;
//   return response.json(user);
// });

// userRouter.patch(
//   '/avatar',
//   ensureAuthenticated,
//   upload.single('avatar'),
//   async (request, response) => {
//     // const usersRepository = new UsersRepository();
//     // const uploadUserAvatar = new UpdateUserAvatarService(usersRepository);
//     const uploadUserAvatar = container.resolve(UpdateUserAvatarService);

//     const user = await uploadUserAvatar.execute({
//       user_id: request.user.id,
//       avatarFilename: request.file.filename,
//     });

//     delete user.password;
//     return response.json(user);
//   },
// );
userRouter.post('/', usersController.create);

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default userRouter;
