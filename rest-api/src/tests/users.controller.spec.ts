import 'reflect-metadata';
import express from 'express';
import request from 'supertest';
import { Application } from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from '../container';
import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/user.service';
import { UsersController } from '../users/user.controller';
import { AuthController } from '../auth/auth.controller';
import jwt from 'jsonwebtoken';

const AppTestDataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [User],
    synchronize: true,
    logging: false,
});

let app: Application;
let token: string;

beforeAll(async () => {
    await AppTestDataSource.initialize();

    const userRepository = AppTestDataSource.getRepository(User);
    
    const customUserRepository = new UsersRepository(userRepository);
    container.rebind<UsersRepository>(UsersRepository).toConstantValue(customUserRepository);

    const server = new InversifyExpressServer(container);
    server.setConfig((app) => {
        app.use(express.json());
    });

    app = server.build();

    const userService = container.get<UsersService>(UsersService); 
    await userService.createUser({ username: 'testuser', password: 'testpassword' } as User);

    token = jwt.sign({ username: 'testuser' }, process.env.JWT_SECRET!, { expiresIn: '1h' });
});

afterAll(async () => {
    await AppTestDataSource.destroy();
});

describe('Users API', () => {
    it('should create a user', async () => {
        const res = await request(app)
            .post('/users')
            .send({ username: 'newuser', password: 'newpassword' });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('username', 'newuser');
    });

    it('should get all users', async () => {
        const res = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should get a user by id', async () => {
        const userService = container.get<UsersService>(UsersService);
        const user = await userService.findUserByUsername('newuser');
        const res = await request(app)
            .get(`/users/${user!.id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('username', 'newuser');
    });

    it('should update a user', async () => {
        const userService = container.get<UsersService>(UsersService);
        let user = await userService.findUserByUsername('newuser');

        const res = await request(app)
            .put(`/users/${user!.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ username: 'updateduser' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('username', 'updateduser');

        // 업데이트된 사용자 정보로 user를 다시 설정합니다.
        user = await userService.findUserByUsername('updateduser');
    });

    it('should delete a user', async () => {
        const userService = container.get<UsersService>(UsersService);
        const user = await userService.findUserByUsername('updateduser');
        
        if (!user) {
            throw new Error('User not found');
        }

        const res = await request(app)
            .delete(`/users/${user.id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(204);
    });

    it('should return 401 for unauthorized access', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toEqual(401);
    });
});
