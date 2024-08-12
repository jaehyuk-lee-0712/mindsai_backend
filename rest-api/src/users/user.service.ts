import { injectable, inject } from "inversify";
import { UsersRepository } from "./users.repository";
import { User } from "./entities/user.entity";
import bcrypt from "bcryptjs";

@injectable()
export class UsersService {
  constructor(
    @inject(UsersRepository) private usersRepository: UsersRepository
  ) {}

  async createUser(user: User): Promise<User> {
    const existingUser = await this.usersRepository.findUserByUsername(user.username);
    if (existingUser) {
      throw new Error('User already exists');
    }
    user.password = await bcrypt.hash(user.password, 10);
    return this.usersRepository.createUser(user);
  }

  async findUserById(id: number): Promise<User | null> {
    return this.usersRepository.findUserById(id);
  }

  async findAllUsers(): Promise<User[]> {
    return this.usersRepository.findAllUsers();
  }

  async updateUser(id: number, user: Partial<User>): Promise<User | null> {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    return this.usersRepository.updateUser(id, user);
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.usersRepository.deleteUser(id);
  }

  async validatePassword(username: string, password: string): Promise<boolean> {
    const user = await this.usersRepository.findUserByUsername(username);
    if (!user) {
      throw new Error('User not found');
    }
    return bcrypt.compare(password, user.password);
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findUserByUsername(username);
  }
}
