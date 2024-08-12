import { injectable, inject } from "inversify";
import { UsersService } from "../users/user.service";
import jwt from "jsonwebtoken";

@injectable()
export class AuthService {
  constructor(@inject(UsersService) private usersService: UsersService) {}

  async login(username: string, password: string): Promise<string> {
    const isPasswordValid = await this.usersService.validatePassword(username, password);
    if (!isPasswordValid) {
      throw new Error('올바르지 않은 비밀번호.');
    }
    const token = jwt.sign({ username }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    return token;
  }
}
