import { Request, Response } from 'express';
import { CreatorUserService } from './services/creator-user.service';
import { LoginUserService } from './services/login-user.service';
import { FinderUserService } from './services/finder-user.service';
import { UpdateUserService } from './services/updater-user.service';
import { EliminatorUserService } from './services/eliminator-user.service';
import { handleError } from '../common/errors/handleError';
import { LoginUserDto, RegisterUserDto } from '../../domain';
import { envs } from '../../config/env';

export class UserController {
  constructor(
    private readonly creatorUserService: CreatorUserService,
    private readonly loginUserService: LoginUserService,
    private readonly finderUserService: FinderUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly eliminatorUserService: EliminatorUserService,
  ) {}

  register = (req: Request, res: Response) => {
    const [error, data] = RegisterUserDto.execute(req.body);

    if (error) {
      return res.status(422).json({ message: error });
    }

    this.creatorUserService
      .execute(data!)
      .then((user) => res.status(201).json(user))
      .catch((error) => handleError(error, res));
  };

  login = (req: Request, res: Response) => {
    const [error, data] = LoginUserDto.execute(req.body);

    if (error) {
      return res.status(422).json({ message: error });
    }

    this.loginUserService
      .execute(data!)
      .then((data) => {
        res.cookie('token', data.token, {
          httpOnly: true,
          secure: envs.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 3 * 60 * 60 * 1000,
        });
        res.status(200).json(data);
      })
      .catch((error) => handleError(error, res));
  };

  findAll = (req: Request, res: Response) => {
    this.finderUserService
      .executeByFindAll()
      .then((data) => res.status(200).json(data))
      .catch((error) => handleError(error, res));
  };

  findOne = (req: Request, res: Response) => {
    const { id } = req.params;

    this.finderUserService
      .executeByFindOne(id)
      .then((data) => res.status(200).json(data))
      .catch((error) => handleError(error, res));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    this.updateUserService
      .execute(id, data)
      .then((result) => res.status(200).json(result))
      .catch((error) => handleError(error, res));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;

    this.eliminatorUserService
      .execute(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => handleError(error, res));
  };
}
