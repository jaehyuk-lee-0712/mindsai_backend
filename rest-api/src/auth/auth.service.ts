import { injectable } from 'inversify';
import { sign } from 'jsonwebtoken';
import { UsersService } from '../users/user.service';
import * as dotenv from 'dotenv';

dotenv.config();

@injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  public async login(username: string, password: string): Promise<string | null> {
    const user = await this.usersService.findUserByUsername(username);
    if (user && user.password === password) {
      const token = sign({ id: user.id, username: user.username }, process.env.JWT_SECRET!, {
        expiresIn: '1h',
      });
      return token;
    }
    return null;
  }
}
