import { FinderUserService } from './finder-user.service';

export class UpdateUserService {
  constructor(private readonly finderUserService: FinderUserService) {}

  async execute(id: string, data: any) {
    const user = await this.finderUserService.executeByFindOne(id);

    if (!user) {
      throw new Error('User not found');
    }

    if (data.name) user.name = data.name.trim().toLowerCase();
    if (data.email) user.email = data.email.trim().toLowerCase();
    if (data.rol) user.rol = data.rol.trim().toLowerCase();
    if (typeof data.status === 'boolean') user.status = data.status;

    try {
      return await user.save();
    } catch (error) {
      throw new Error('Failed to update user');
    }
  }
}
