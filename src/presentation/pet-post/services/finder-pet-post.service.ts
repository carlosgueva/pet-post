import { PetPost, PetPostStatus } from '../../../data';
import { CustomError } from '../../../domain';

export class FinderPetPostService {
  async executeByFindAll() {
    const petPost = await PetPost.find({
      where: {
        status: PetPostStatus.APPROVED,
        hasfound: false,
      },
      relations: ['user'],
      select: {
        id: true,
        petname: true,
        description: true,
        image_url: true,
        status: true,
        hasfound: true,
        user: {
          id: true,
          name: true,
          email: true,
        },
      },
    });

    return petPost;
  }

  async executeByFindOne(id: string) {
    const petPost = await PetPost.findOne({
      where: {
        id,
      },
      relations: ['user'],
      select: {
        id: true,
        petname: true,
        description: true,
        image_url: true,
        status: true,
        hasfound: true,
        user: {
          id: true,
          name: true,
          email: true,
        },
      },
    });

    if (!petPost) {
      throw CustomError.notFound('Pet not found');
    }

    return petPost;
  }
}
