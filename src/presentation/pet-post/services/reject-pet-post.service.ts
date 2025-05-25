import { PetPostStatus } from '../../../data';
import { FinderPetPostService } from './finder-pet-post.service';

export class RejectPetPostService {
  constructor(private readonly finderPetPostService: FinderPetPostService) {}

  async execute(id: string) {
    const petPost = await this.finderPetPostService.executeByFindOne(id);

    if (petPost.status === 'approved') {
      throw new Error('Pet post already approved');
    }

    if (petPost.status === 'rejected') {
      throw new Error('Pet post is already rejected');
    }

    petPost.status = PetPostStatus.REJECTED;

    try {
      await petPost.save();
      return {
        message: 'Pet post  rejected successfully',
      };
    } catch (error) {
      throw new Error('Error updating pet post status');
    }
  }
}
