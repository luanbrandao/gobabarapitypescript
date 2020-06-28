import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createAppointment: CreateUserService;
let createUser: CreateUserService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createAppointment = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createAppointment.execute({
      name: 'jhon foe',
      email: 'jhon@gmail.com',
      password: 'asdfasdf',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'jhon foe',
      email: 'jhon@gmail.com',
      password: 'asdfasdf',
    });

    await expect(
      createUser.execute({
        name: 'jhon foe',
        email: 'jhon@gmail.com',
        password: 'asdfasdf',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
