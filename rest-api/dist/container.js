"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const user_controller_1 = require("./users/user.controller");
const user_service_1 = require("./users/user.service");
const users_repository_1 = require("./users/users.repository");
const auth_controller_1 = require("./auth/auth.controller");
const auth_service_1 = require("./auth/auth.service");
const container = new inversify_1.Container();
exports.container = container;
container.bind(user_service_1.UsersService).toSelf().inSingletonScope();
container.bind(users_repository_1.UsersRepository).toSelf().inSingletonScope();
container.bind(auth_service_1.AuthService).toSelf();
container.bind(user_controller_1.UsersController).toSelf();
container.bind(auth_controller_1.AuthController).toSelf();
