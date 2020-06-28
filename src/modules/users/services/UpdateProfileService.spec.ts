import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'jhon foe',
      email: 'jhon@gmail.com',
      password: 'asdfasdf',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'jhon2',
      email: 'jhon2@gmail.com',
    });
    expect(updatedUser.name).toBe('jhon2');
    expect(updatedUser.email).toBe('jhon2@gmail.com');
  });

  it('should be able update the profile from non-existing user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-existing-user-id',
        name: 'Test',
        email: 'test@gamil.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email ', async () => {
    await fakeUsersRepository.create({
      name: 'jhon foe',
      email: 'jhon@gmail.com',
      password: 'asdfasdf',
    });

    const user = await fakeUsersRepository.create({
      name: 'test',
      email: 'test@gmail.com',
      password: 'adsfasdf',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'jhon2',
        email: 'jhon@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'jhon foe',
      email: 'jhon@gmail.com',
      password: 'asdfasdf',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'jhon2',
      email: 'jhon2@gmail.com',
      old_password: 'asdfasdf',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'jhon foe',
      email: 'jhon@gmail.com',
      password: 'asdfasdf',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'jhon2',
        email: 'jhon2@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'jhon foe',
      email: 'jhon@gmail.com',
      password: 'asdfasdf',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'jhon2',
        email: 'jhon2@gmail.com',
        old_password: 'wrong-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
