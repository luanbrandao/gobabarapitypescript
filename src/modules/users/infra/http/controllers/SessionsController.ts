import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { container } from 'tsyringe';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authentucate = container.resolve(AuthenticateUserService);

    const { user, token } = await authentucate.execute({
      email,
      password,
    });

    // delete user.password;
    return response.json({ user: classToClass(user), token });
  }
}
