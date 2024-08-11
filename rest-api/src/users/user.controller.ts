import { Request, Response } from "express";
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  requestBody,
  requestParam,
  response,
} from "inversify-express-utils";
import { inject } from "inversify";
import { UsersService } from "./user.service";
import { User } from "./entities/user.entity";
import { authMiddleware } from "../middlewares/auth.middleware";

@controller("/users")
export class UsersController {
  constructor(@inject(UsersService) private usersService: UsersService) {}

  @httpPost("/")
  public async createUser(@requestBody() user: User, @response() res: Response) {
    const newUser = await this.usersService.createUser(user);
    return res.status(201).json(newUser); 
  }

  @httpGet("/" , authMiddleware)
  public async getAllUsers(@response() res: Response) {
    const users = await this.usersService.findAllUsers();
    return res.json(users);
  }

  @httpGet("/:id" , authMiddleware)
  public async getUser(@requestParam("id") id: number, @response() res: Response) {
    const user = await this.usersService.findUserById(id);
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).send("User not found");
    }
  }

  @httpPut('/:id')
  public async updateUser(@requestParam('id') id: number, @requestBody() user: Partial<User>, @response() res: Response) {
    await this.usersService.updateUser(id, user);
    const updatedUser = await this.usersService.findUserById(id);
    if (!updatedUser) {
      return res.status(404).send();
    }
    return res.status(200).json(updatedUser);
  }

  @httpDelete('/:id', authMiddleware)
  public async deleteUser(@requestParam('id') id: number, @response() res: Response) {
    const result = await this.usersService.deleteUser(id);
    if (result) {
      return res.status(204).send();
    } else {
      return res.status(404).send('User not found');
    }
  }
}
