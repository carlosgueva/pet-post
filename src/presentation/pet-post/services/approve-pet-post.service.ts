import { PetPostStatus } from '../../../data';
import { CustomError } from '../../../domain';
import { FinderPetPostService } from './finder-pet-post.service';

export class ApprovePetPostService {
  constructor(private readonly finderPetPostService: FinderPetPostService) {}

  async execute(id: string) {
    const petPost = await this.finderPetPostService.executeByFindOne(id);

    if (petPost.status === 'approved') {
      return {
        message: 'Pet post is already approved',
      };
    }

    petPost.status = PetPostStatus.APPROVED;

    try {
      await petPost.save();
      return {
        message: 'Pet post status updated successfully',
      };
    } catch (error) {
      throw CustomError.internalServer('Internal Server Error');
    }
  }
}
