import { Injectable, Logger } from '@nestjs/common';
import { Pool } from 'pg';
import { AppConfig } from '../app.config';

@Injectable()
export class SharedService {
    
    private pool: Pool;
    constructor(private readonly config: AppConfig){
        this.pool = new Pool({
            user: this.config.pgUsername,
            host: this.config.pgHost,
            database: this.config.pgDatabase,
            password: this.config.pgPassword,
            port: this.config.pgPort,
            ssl: { rejectUnauthorized: false }
        })
    }

    async query(query, params) {
        try{
            const result = await this.pool.query(query, params);
            return result;
        } catch(e){
            Logger.error(e.message,e);
            throw new Error(e);
        }
    }

    createUpdateChanges(body: any): any {
        let result = '';
        let i = 1;
        let params = [];
        for (let property of Object.keys(body)) {
            if(property=='id')
                continue;
            result += `${property}=$${i++},`
            params.push(body[property])
        }
        return { params: params, changes: result.slice(0, -1), index: i };
    }

    generateTsquery(query: string): string{
        let result: string = '';
        let words = query.split(' ');
        for(let word of words){
            result += word + ' | ';
        }
        return result.slice(0, -3);
    }
}
