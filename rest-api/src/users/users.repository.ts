import { injectable } from "inversify";
import { Repository } from "typeorm";
import { AppDataSource } from "../config";
import { User } from "./entities/user.entity";

@injectable()
export class UsersRepository {
  private repository: Repository<User>;

  constructor(repository?: Repository<User>) {
    if (repository) {
      this.repository = repository;
    } else {
      this.repository = AppDataSource.getRepository(User);
    }
  }

  createUser(user: User) {
    return this.repository.save(user);
  }

  findUserById(id: number) {
    return this.repository.findOneBy({ id });
  }

  findAllUsers() {
    return this.repository.find();
  }

  updateUser(id: number, user: Partial<User>) {
    return this.repository.update(id, user);
  }

  deleteUser(id: number) {
    return this.repository.delete(id);
  }

  findUserByUsername(username: string) {
    return this.repository.findOneBy({ username });
  }
}
