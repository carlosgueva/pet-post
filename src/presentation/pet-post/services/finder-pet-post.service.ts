import { PetPost, PetPostStatus } from '../../../data';

export class FinderPetPostService {
  async executeByFindAll() {
    return await PetPost.find({
      where: {
        status: PetPostStatus.APPROVED,
        hasfound: false,
      },
    });
  }

  async executeByFindOne(id: string) {
    const petPost = await PetPost.findOne({
      where: {
        id,
      },
    });

    if (!petPost) {
      throw new Error('Pet post not found');
    }

    return petPost;
  }
}
