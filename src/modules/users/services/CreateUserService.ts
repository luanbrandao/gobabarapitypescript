// import { hash } from 'bcryptjs';
// import { getRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private iHashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute({ name, email, password }: IRequest): Promise<User> {
    // const usersRepository = getRepository(User);
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address alredy used.');
    }

    // const hashedPassword = await hash(password, 8);
    const hashedPassword = await this.iHashProvider.generateHash(password);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    // await usersRepository.save(user);

    await this.cacheProvider.invalidatePrefix('providers-list');
    return user;
  }
}
export default CreateUserService;
