import { PetPost } from '../../../data';

export class CreatorPetPostService {
  async execute(data: any) {
    const petPost = new PetPost();

    petPost.petname = data.petname.trim().toLowerCase();
    petPost.description = data.description.trim().toLowerCase();
    petPost.image_url = data.image_url.trim();

    try {
      return await petPost.save();
    } catch (error) {
      throw new Error('Failed to create pet post');
    }
  }
}
