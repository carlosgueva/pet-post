import { Router } from 'express';
import { CreatorUserService } from './services/creator-user.service';
import { UserController } from './controller';
import { LoginUserService } from './services/login-user.service';
import { FinderUserService } from './services/finder-user.service';
import { UpdateUserService } from './services/updater-user.service';
import { EliminatorUserService } from './services/eliminator-user.service';
import { AuthMiddleware } from '../common/middlewares/auth.middlewares';
import { UserRole } from '../../data';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const finderUserService = new FinderUserService();
    const loginUserService = new LoginUserService();
    const creatorUserService = new CreatorUserService();
    const updateUserService = new UpdateUserService(finderUserService);
    const deteleUserService = new EliminatorUserService(finderUserService);

    const controller = new UserController(
      creatorUserService,
      loginUserService,
      finderUserService,
      updateUserService,
      deteleUserService,
    );

    router.post('/register', controller.register);
    router.post('/login', controller.login);
    router.use(AuthMiddleware.protect);
    router.get(
      '/',
      AuthMiddleware.restrictTo(UserRole.ADMIN),
      controller.findAll,
    );
    router.get('/:id', controller.findOne);
    router.patch(
      '/:id',
      AuthMiddleware.restrictTo(UserRole.ADMIN),
      controller.update,
    );
    router.delete(
      '/:id',
      AuthMiddleware.restrictTo(UserRole.ADMIN),
      controller.delete,
    );

    return router;
  }
}
