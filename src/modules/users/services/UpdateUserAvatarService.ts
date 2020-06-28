// import { getRepository } from 'typeorm';
// import path from 'path';
// import fs from 'fs';

// import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}
@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    // const userRepository = getRepository(User);

    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Only authentication users can change avatar', 401);
    }

    // if (user.avatar) {
    //   // deletar avatar anterior
    //   const userAvatarFilepath = path.join(uploadConfig.directory, user.avatar);
    //   const userAvatarFileExists = await fs.promises.stat(userAvatarFilepath);

    //   if (userAvatarFileExists) {
    //     await fs.promises.unlink(userAvatarFilepath);
    //   }
    // }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    // user.avatar = avatarFilename;
    user.avatar = filename;

    // save, se nãi tiver id cria, caso contrario atualiza
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
