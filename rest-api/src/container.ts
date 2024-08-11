import { Container } from 'inversify';
import { UsersController } from './users/user.controller';
import { UsersService } from './users/user.service';
import { UsersRepository } from './users/users.repository';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

const container = new Container();

container.bind<UsersService>(UsersService).toSelf().inSingletonScope();
container.bind<UsersRepository>(UsersRepository).toSelf().inSingletonScope();
container.bind<AuthService>(AuthService).toSelf();
container.bind<UsersController>(UsersController).toSelf();
container.bind<AuthController>(AuthController).toSelf();

export { container };
