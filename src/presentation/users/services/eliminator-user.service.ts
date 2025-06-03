import { CustomError } from '../../../domain';
import { FinderUserService } from './finder-user.service';

export class EliminatorUserService {
  constructor(private readonly finderUserService: FinderUserService) {}

  async execute(id: string) {
    const user = await this.finderUserService.executeByFindOne(id);

    if (!user) {
      throw new Error('User not found');
    }

    try {
      await user.remove();
      return {
        message: 'User deleted successfully',
      };
    } catch (error) {
      throw CustomError.internalServer('Internal Server Error');
    }
  }
}
