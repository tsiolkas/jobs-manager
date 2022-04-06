import { Logger, Injectable } from '@nestjs/common';
import { SharedService } from '../shared/shared.service';

@Injectable()
export class UserService {
    
    constructor(private readonly sharedService: SharedService){}

    async getUser(username: string): Promise<any>{
        const query: string= `SELECT * FROM users WHERE username = $1;`;
        try{
            let result = await this.sharedService.query(query, [username])
            if(result.rowCount>1)
                throw new Error(`Should find only one user with username ${username}`)
            if(result.rowCount == 0)
                return null;
            return result.rows[0]
        } catch (e) {
            Logger.error(`Error on retrieving user with message: ${e.message}`, e)
            throw new Error(e);
        }
    }

    async createUser(user): Promise<void> {
        const query: string = `INSERT INTO users (username,password,fullname) VALUES ($1,$2,$3);`;
        try{
            const result = await this.sharedService.query(query, [user.username, user.password, user.fullname]);
            if (result.rowCount == 1) {
                Logger.log(`User ${user.username} inserted`);
            }
        } catch (e) {
            Logger.error(e.message, e)
            throw new Error(e);
        }
    }
}
