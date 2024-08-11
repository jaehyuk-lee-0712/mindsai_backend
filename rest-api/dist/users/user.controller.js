"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const user_service_1 = require("./user.service");
const user_entity_1 = require("./entities/user.entity");
const auth_middleware_1 = require("../middlewares/auth.middleware");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    createUser(user, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield this.usersService.createUser(user);
            return res.status(201).json(newUser);
        });
    }
    getAllUsers(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.usersService.findAllUsers();
            return res.json(users);
        });
    }
    getUser(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.findUserById(id);
            if (user) {
                return res.json(user);
            }
            else {
                return res.status(404).send("User not found");
            }
        });
    }
    updateUser(id, user, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.usersService.updateUser(id, user);
            const updatedUser = yield this.usersService.findUserById(id);
            if (!updatedUser) {
                return res.status(404).send();
            }
            return res.status(200).json(updatedUser);
        });
    }
    deleteUser(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.usersService.deleteUser(id);
            if (result) {
                return res.status(204).send();
            }
            else {
                return res.status(404).send('User not found');
            }
        });
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, inversify_express_utils_1.httpPost)("/"),
    __param(0, (0, inversify_express_utils_1.requestBody)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/", auth_middleware_1.authMiddleware),
    __param(0, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/:id", auth_middleware_1.authMiddleware),
    __param(0, (0, inversify_express_utils_1.requestParam)("id")),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
__decorate([
    (0, inversify_express_utils_1.httpPut)('/:id'),
    __param(0, (0, inversify_express_utils_1.requestParam)('id')),
    __param(1, (0, inversify_express_utils_1.requestBody)()),
    __param(2, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, inversify_express_utils_1.httpDelete)('/:id', auth_middleware_1.authMiddleware),
    __param(0, (0, inversify_express_utils_1.requestParam)('id')),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
exports.UsersController = UsersController = __decorate([
    (0, inversify_express_utils_1.controller)("/users"),
    __param(0, (0, inversify_1.inject)(user_service_1.UsersService)),
    __metadata("design:paramtypes", [user_service_1.UsersService])
], UsersController);
