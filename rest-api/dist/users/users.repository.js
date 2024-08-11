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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const inversify_1 = require("inversify");
const typeorm_1 = require("typeorm");
const config_1 = require("../config");
const user_entity_1 = require("./entities/user.entity");
let UsersRepository = class UsersRepository {
    constructor(repository) {
        if (repository) {
            this.repository = repository;
        }
        else {
            this.repository = config_1.AppDataSource.getRepository(user_entity_1.User);
        }
    }
    createUser(user) {
        return this.repository.save(user);
    }
    findUserById(id) {
        return this.repository.findOneBy({ id });
    }
    findAllUsers() {
        return this.repository.find();
    }
    updateUser(id, user) {
        return this.repository.update(id, user);
    }
    deleteUser(id) {
        return this.repository.delete(id);
    }
    findUserByUsername(username) {
        return this.repository.findOneBy({ username });
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UsersRepository);
