import { injectable } from "inversify";
import { Repository } from "typeorm";
import { AppDataSource } from "../config";
import { User } from "./entities/user.entity";

@injectable()
export class UsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async createUser(user: User): Promise<User> {
    return this.repository.save(user);
  }

  async findUserById(id: number): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findAllUsers(): Promise<User[]> {
    return this.repository.find();
  }

  async updateUser(id: number, user: Partial<User>): Promise<User | null> {
    await this.repository.update(id, user);
    return this.findUserById(id);
  }

  async deleteUser(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.repository.findOne({ where: { username } });
  }
}
