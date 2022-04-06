import { Controller, Post, Body, Res, Logger } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { UserService } from './users/user.service';

@Controller()
export class AppController {

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) { }

  @Post('login')
  async login(@Body() user, @Res() res) {
    try{
      let result = await this.authService.login(user);
      if(!result){
        res.status(401).send();
        return;
      }
      res.status(201).send(result);
    } catch(e){
      Logger.error(e.message,e)
      throw new Error(e);
    }
  }

  @Post('sign-up')
  async signUp(@Body() user) {
    try{
      await this.userService.createUser(user);
    } catch (e) {
      Logger.error(e.message, e)
      throw new Error(e);
    }
  }
}
