import { User } from '../../../data';
import { CustomError } from '../../../domain';

export class FinderUserService {
  async executeByFindAll() {
    return await User.find({
      select: ['id', 'name', 'email', 'rol'],
      where: {
        status: true,
      },
    });
  }

  async executeByFindOne(id: string) {
    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw CustomError.notFound('User not found');
    }

    return user;
  }
}
