import { Container } from 'inversify';
import { UsersService } from './users/user.service';
import { UsersRepository } from './users/users.repository';
import { AuthService } from './auth/auth.service';
import { DataSource, Repository } from 'typeorm';
import { User } from './users/entities/user.entity';
import { AppDataSource } from './config';

const container = new Container();


const userRepository = AppDataSource.getRepository(User);
container.bind<Repository<User>>(Repository).toConstantValue(userRepository);
container.bind<UsersService>(UsersService).toSelf().inSingletonScope();
container.bind<UsersRepository>(UsersRepository).toSelf().inSingletonScope();
container.bind<AuthService>(AuthService).toSelf();



export { container };
