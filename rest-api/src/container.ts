import { Container } from "inversify";
import { UsersService } from "./users/users.service";
import { UsersRepository } from "./users/users.repository";
import { AuthService } from "./auth/auth.service";

const container = new Container();

container.bind<UsersService>(UsersService).toSelf();
container.bind<UsersRepository>(UsersRepository).toSelf();
container.bind<AuthService>(AuthService).toSelf();

export { container };
