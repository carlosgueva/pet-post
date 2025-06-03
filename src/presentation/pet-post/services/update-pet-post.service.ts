import { CustomError } from '../../../domain';
import { FinderPetPostService } from './finder-pet-post.service';

export class UpdatePetPostService {
  constructor(private readonly finderPetPostService: FinderPetPostService) {}

  async execute(id: string, data: any) {
    const petPost = await this.finderPetPostService.executeByFindOne(id);

    if (!petPost) {
      throw new Error('Pet post not found');
    }

    if (data.petname) petPost.petname = data.petname.trim().toLowerCase();
    if (data.description)
      petPost.description = data.description.trim().toLowerCase();
    if (data.image_url) petPost.image_url = data.image_url.trim();
    if (typeof data.hasfound === 'boolean') petPost.hasfound = data.hasfound;

    try {
      return await petPost.save();
    } catch (error) {
      throw CustomError.internalServer('Internal Server Error');
    }
  }
}
