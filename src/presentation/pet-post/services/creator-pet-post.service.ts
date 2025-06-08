import { PetPost } from '../../../data';
import { CustomError } from '../../../domain';

export class CreatorPetPostService {
  async execute(data: any, sessionUser: any) {
    const petPost = new PetPost();

    petPost.petname = data.petname.trim().toLowerCase();
    petPost.description = data.description.trim().toLowerCase();
    petPost.image_url = data.image_url.trim();
    petPost.user = sessionUser;

    try {
      const savedPost = await petPost.save();
      return {
        id: savedPost.id,
        petname: savedPost.petname,
        description: savedPost.description,
        image_url: savedPost.image_url,
        status: savedPost.status,
        hasfound: savedPost.hasfound,
        user: {
          id: sessionUser.id,
          name: sessionUser.name,
          email: sessionUser.email,
        },
      };
    } catch (error) {
      throw CustomError.internalServer('Internal Server Error');
    }
  }
}
