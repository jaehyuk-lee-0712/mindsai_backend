"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const inversify_express_utils_1 = require("inversify-express-utils");
const container_1 = require("../container");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const users_repository_1 = require("../users/users.repository");
const user_service_1 = require("../users/user.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppTestDataSource = new typeorm_1.DataSource({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [user_entity_1.User],
    synchronize: true,
    logging: false,
});
let app;
let token;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield AppTestDataSource.initialize();
    const userRepository = AppTestDataSource.getRepository(user_entity_1.User);
    const customUserRepository = new users_repository_1.UsersRepository(userRepository);
    container_1.container.rebind(users_repository_1.UsersRepository).toConstantValue(customUserRepository);
    const server = new inversify_express_utils_1.InversifyExpressServer(container_1.container);
    server.setConfig((app) => {
        app.use(express_1.default.json());
    });
    app = server.build();
    const userService = container_1.container.get(user_service_1.UsersService);
    yield userService.createUser({ username: 'testuser', password: 'testpassword' });
    token = jsonwebtoken_1.default.sign({ username: 'testuser' }, process.env.JWT_SECRET, { expiresIn: '1h' });
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield AppTestDataSource.destroy();
}));
describe('Users API', () => {
    it('should create a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .post('/users')
            .send({ username: 'newuser', password: 'newpassword' });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('username', 'newuser');
    }));
    it('should get all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .get('/users')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    }));
    it('should get a user by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const userService = container_1.container.get(user_service_1.UsersService);
        const user = yield userService.findUserByUsername('newuser');
        const res = yield (0, supertest_1.default)(app)
            .get(`/users/${user.id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('username', 'newuser');
    }));
    it('should update a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const userService = container_1.container.get(user_service_1.UsersService);
        let user = yield userService.findUserByUsername('newuser');
        const res = yield (0, supertest_1.default)(app)
            .put(`/users/${user.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ username: 'updateduser' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('username', 'updateduser');
        // 업데이트된 사용자 정보로 user를 다시 설정합니다.
        user = yield userService.findUserByUsername('updateduser');
    }));
    it('should delete a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const userService = container_1.container.get(user_service_1.UsersService);
        const user = yield userService.findUserByUsername('updateduser');
        if (!user) {
            throw new Error('User not found');
        }
        const res = yield (0, supertest_1.default)(app)
            .delete(`/users/${user.id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(204);
    }));
    it('should return 401 for unauthorized access', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get('/users');
        expect(res.statusCode).toEqual(401);
    }));
});
