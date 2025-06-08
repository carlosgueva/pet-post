import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../../config/jwt.adapter';
import { User, UserRole } from '../../../data';

export class AuthMiddleware {
  static async protect(req: Request, res: Response, next: NextFunction) {
    let token = req?.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: 'token no provided' });
    }

    try {
      const payload = (await JwtAdapter.validateToken(token)) as { id: string };
      if (!payload) return res.status(401).json({ message: 'invalid token' });

      const user = await User.findOne({
        where: {
          id: payload.id,
          status: true,
        },
      });

      if (!user) return res.status(401).json({ message: 'invalid token' });

      if (!req.body) {
        req.body = {};
      }

      req.body.sessionUser = user;
      next();
    } catch (error) {
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  static restrictTo = (...roles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!roles.includes(req.body.sessionUser.rol)) {
        return res
          .status(403)
          .json({ message: 'Youe are not authorizated to access this route' });
      }
      next();
    };
  };
}
