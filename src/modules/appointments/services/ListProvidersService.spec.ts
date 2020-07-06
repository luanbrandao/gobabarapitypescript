// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProfileService: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;
describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProfileService = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the proviers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'jhon foe',
      email: 'jhon@gmail.com',
      password: 'asdfasdf',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'jhon foe 2',
      email: 'jhon2@gmail.com',
      password: 'asdfasdf',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'jhon foe 3',
      email: 'jhon3@gmail.com',
      password: 'asdfasdf',
    });

    const providers = await listProfileService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });

  // it('should be able show the profile from non-existing user', async () => {
  //   await expect(
  //     fakeUsersRepository.execute({
  //       user_id: 'non-existing-user-id',
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });
});
