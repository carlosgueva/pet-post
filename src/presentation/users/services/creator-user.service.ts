import { encriptAdapter } from '../../../config/bcrypt.adapter';
import { User } from '../../../data';
import { CustomError, RegisterUserDto } from '../../../domain';

export class CreatorUserService {
  async execute(data: RegisterUserDto) {
    const user = new User();

    user.name = data.name.trim().toLowerCase();
    user.email = data.email.trim().toLowerCase();
    user.password = encriptAdapter.hash(data.password.trim());
    try {
      await user.save();
      return user;
    } catch (error) {
      CustomError.internalServer('Internal Server Error');
    }
  }
}
