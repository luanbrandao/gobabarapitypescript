import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
// import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateUser', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let fakeHashProvider: FakeHashProvider;
  // let createUserService: CreateUserService;
  let authenticateUser: AuthenticateUserService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    // createUserService = new CreateUserService(
    //   fakeUsersRepository,
    //   fakeHashProvider,
    // );

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    await fakeUsersRepository.create({
      name: 'jhon',
      email: 'jhon@gmail.com',
      password: 'asdfasdf',
    });

    const response = await authenticateUser.execute({
      email: 'jhon@gmail.com',
      password: 'asdfasdf',
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to autheticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'jhon@gmail.com',
        password: 'asdfasdf',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'jhon',
      email: 'jhon@gmail.com',
      password: 'asdfasdf',
    });

    await expect(
      authenticateUser.execute({
        email: 'jhon@gmail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
