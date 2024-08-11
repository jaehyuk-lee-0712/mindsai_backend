import { injectable, inject } from "inversify";
import { UsersRepository } from "./users.repository";
import { User } from "./entities/user.entity";

@injectable()
export class UsersService {
  constructor(
    @inject(UsersRepository) private usersRepository: UsersRepository
  ) {}

  createUser(user: User) {
    return this.usersRepository.createUser(user);
  }

  findUserById(id: number) {
    return this.usersRepository.findUserById(id);
  }

  findAllUsers() {
    return this.usersRepository.findAllUsers();
  }

  updateUser(id: number, user: Partial<User>) {
    return this.usersRepository.updateUser(id, user);
  }

  deleteUser(id: number) {
    return this.usersRepository.deleteUser(id);
  }
}
