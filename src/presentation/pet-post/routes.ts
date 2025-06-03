import { Router } from 'express';
import { PetPostController } from './controller';
import { CreatorPetPostService } from './services/creator-pet-post.service';
import { FinderPetPostService } from './services/finder-pet-post.service';
import { ApprovePetPostService } from './services/approve-pet-post.service';
import { RejectPetPostService } from './services/reject-pet-post.service';
import { UpdatePetPostService } from './services/update-pet-post.service';
import { EliminatorPetPostService } from './services/eliminator-pet-post.service';
import { AuthMiddleware } from '../common/middlewares/auth.middlewares';
import { UserRole } from '../../data';

export class PetPostRoutes {
  static get routes() {
    const router = Router();

    const creatorPetPostService = new CreatorPetPostService();
    const finderPetPostService = new FinderPetPostService();
    const approvePetPostService = new ApprovePetPostService(
      finderPetPostService,
    );
    const rejectPetPostService = new RejectPetPostService(finderPetPostService);
    const updatePetPostService = new UpdatePetPostService(finderPetPostService);
    const deletePetPostService = new EliminatorPetPostService(
      finderPetPostService,
    );

    const controller = new PetPostController(
      creatorPetPostService,
      finderPetPostService,
      approvePetPostService,
      rejectPetPostService,
      updatePetPostService,
      deletePetPostService,
    );

    router.use(AuthMiddleware.protect);
    router.post('/', controller.create);
    router.get('/', controller.findAll);
    router.get('/:id', controller.findOne);
    router.patch(
      '/:id/approve',
      AuthMiddleware.restrictTo(UserRole.ADMIN),
      controller.approve,
    );
    router.patch(
      '/:id/reject',
      AuthMiddleware.restrictTo(UserRole.ADMIN),
      controller.reject,
    );
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
