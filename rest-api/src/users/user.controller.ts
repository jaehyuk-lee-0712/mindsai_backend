import { Request, Response } from "express";
import {
  controller,
  httpGet,
  httpPost,
  requestBody,
  requestParam,
} from "inversify-express-utils";
import { inject } from "inversify";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";

@controller("/users")
export class UsersController {
  constructor(@inject(UsersService) private usersService: UsersService) {}

  @httpPost("/")
  public async createUser(@requestBody() user: User, res: Response) {
    const newUser = await this.usersService.createUser(user);
    res.json(newUser);
  }

  @httpGet("/")
  public async getAllUsers(req: Request, res: Response) {
    const users = await this.usersService.findAllUsers();
    res.json(users);
  }

  @httpGet("/:id")
  public async getUser(@requestParam("id") id: number, res: Response) {
    const user = await this.usersService.findUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("User not found");
    }
  }

  // Add update and delete endpoints as needed
}
