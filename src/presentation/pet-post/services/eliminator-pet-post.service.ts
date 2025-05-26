import { FinderPetPostService } from './finder-pet-post.service';

export class EliminatorPetPostService {
  constructor(private readonly finderPetPostService: FinderPetPostService) {}

  async execute(id: string) {
    const petPost = await this.finderPetPostService.executeByFindOne(id);

    if (!petPost) {
      throw new Error('Pet post not found');
    }

    try {
      await petPost.remove();
      return {
        message: 'Pet post deleted successfully',
      };
    } catch (error) {
      throw new Error('Error deleting pet post');
    }
  }
}
