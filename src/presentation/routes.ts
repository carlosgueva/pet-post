import { Router } from 'express';
import { UserRoutes } from './users/routes';
import { PetPostRoutes } from './pet-post/routes';

export class AppRoutes {
  static get routes() {
    const router = Router();

    router.use('/api/users', UserRoutes.routes);
    router.use('/api/pet-posts', PetPostRoutes.routes);

    return router;
  }
}
