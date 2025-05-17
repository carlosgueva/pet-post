import { Request, Response } from 'express';
import { CreatorUserService } from './services/creator-user.service';
import { LoginUserService } from './services/login-user.service';
import { FinderUserService } from './services/finder-user.service';
import { exec } from 'child_process';

export class UserController {
  constructor(
    private readonly creatorUserService: CreatorUserService,
    private readonly loginUserService: LoginUserService,
    private readonly finderUserService: FinderUserService,
  ) {}

  register = (req: Request, res: Response) => {
    this.creatorUserService
      .execute(req.body)
      .then((user) => res.status(201).json(user))
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  };

  login = (req: Request, res: Response) => {
    this.loginUserService
      .execute()
      .then((data) => res.status(200).json(data))
      .catch((error) =>
        res.status(500).json({ message: 'Internal Server Error' }),
      );
  };

  findAll = (req: Request, res: Response) => {
    this.finderUserService
      .executeByFindAll()
      .then((data) => res.status(200).json(data))
      .catch((error) =>
        res.status(500).json({ message: 'Internal Server Error' }),
      );
  };

  findOne = (req: Request, res: Response) => {
    const { id } = req.params;

    this.finderUserService
      .executeByFindOne(id)
      .then((data) => res.status(200).json(data))
      .catch((error) =>
        res.status(500).json({ message: 'Internal Server Error' }),
      );
  };
}
