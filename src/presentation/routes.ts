import { Router } from 'express';
import { UserRoutes } from './users/routes';

export class AppRoutes {
  static get routes() {
    const router = Router();

    router.use('/api/users', UserRoutes.routes);

    return router;
  }
}
