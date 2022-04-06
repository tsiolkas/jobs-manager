import { Logger, Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        try{
            const user = await this.userService.getUser(username);
            if (user && user.password === pass) {
                const { password, ...result } = user;
                return result;
            }
            return null;
        } catch (e) {
            Logger.error(e.message, e);
            throw new Error(e);
        }
    }

    async login(user: any) {
        try{
            const currentUser = await this.validateUser(user.username, user.password);
            if (currentUser){
                const payload = { username: currentUser.username, sub: currentUser.id };
                return {
                    access_token: this.jwtService.sign(payload),
                };
            }
            return null;
        } catch (e) {
            Logger.error(e.message, e);
            throw new Error(e)
        }
    }
}