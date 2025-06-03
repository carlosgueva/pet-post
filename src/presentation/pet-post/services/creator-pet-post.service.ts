import { PetPost } from '../../../data';
import { CustomError } from '../../../domain';

export class CreatorPetPostService {
  async execute(data: any) {
    const petPost = new PetPost();

    petPost.petname = data.petname.trim().toLowerCase();
    petPost.description = data.description.trim().toLowerCase();
    petPost.image_url = data.image_url.trim();

    try {
      return await petPost.save();
    } catch (error) {
      throw CustomError.internalServer('Internal Server Error');
    }
  }
}
