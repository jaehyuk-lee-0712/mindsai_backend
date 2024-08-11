import { Request, Response } from 'express';
import { controller, httpPost, requestBody, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import { AuthService } from './auth.service';

@controller('/auth')
export class AuthController {
  constructor(@inject(AuthService) private authService: AuthService) {}

  @httpPost('/login')
  public async login(
    @requestBody() body: { username: string; password: string },
    @response() res: Response
  ) {
    const { username, password } = body;  
    
    if (!username || !password) {
      return res.status(400).send('Username and password are required');
    }
    
    const token = await this.authService.login(username, password);
    if (token) {
      return res.json({ token });
    } else {
      return res.status(401).send('Invalid credentials');
    }
  }
}
