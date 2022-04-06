import { Injectable, Logger } from '@nestjs/common';
import { SharedService } from '../shared/shared.service';
import { CreateJobDTO, UpdateJobDTO } from './job.dto';

@Injectable()
export class JobService {
    
    constructor(
        private readonly sharedService: SharedService
    ){}

    async createJob(job: CreateJobDTO): Promise<any>{
        const query: string = `INSERT INTO jobs (title, description, company_id) VALUES ($1, $2, $3) RETURNING *;`;
        const params = [job.title,job.description, job.company_id]
        try{
            const result = await this.sharedService.query(query, params);
            if (result.rowCount == 1) {
                Logger.log(`Job ${result.rows[0].id} inserted`)
                return result.rows[0];
            }
            throw new Error(`Error on inserting new job with title: ${job.title}`)
        } catch(e){
            Logger.error(e.message,e);
            throw new Error(e);
        }
    }

    async updateJob(job: UpdateJobDTO, jobId: number): Promise<any>{
        const changes: any = this.sharedService.createUpdateChanges(job);
        const query: string = `UPDATE jobs SET ${changes.changes} WHERE id=$${changes.index} RETURNING *;`;
        const params = [...changes.params, jobId]
        try {
            const result = await this.sharedService.query(query, params);
            if (result.rowCount == 1) {
                Logger.log(`Job ${result.rows[0].id} updated`)
                return result.rows[0];
            }
            else
                return null;
        } catch (e) {
            Logger.error(e.message, e);
            throw new Error(e);
        }
    }

    async deleteJob(jobId: number): Promise<any>{
        const query: string = `UPDATE jobs SET deleted=true WHERE id=$1;`;
        const params = [jobId];
        try {
            const result = await this.sharedService.query(query, params);
            if (result.rowCount == 1) {
                Logger.log(`Job with id: ${jobId} deleted`);
                return result.rowCount;
            }
            else
                return null;
        } catch (e) {
            Logger.error(e.message, e);
            throw new Error(e);
        }
    }

    async filter(filters: string): Promise<any>{
        let tsquery = this.sharedService.generateTsquery(filters);
        const query: string = `SELECT jobs.id, jobs.company_id, title, description, name as company_name FROM jobs LEFT JOIN companies ON jobs.company_id = companies.id
                                where jobs.deleted=false and companies.deleted=false and (to_tsvector(description) @@ to_tsquery($1) or to_tsvector(title) @@ to_tsquery($1));`
        try{
            const result = await this.sharedService.query(query, [tsquery]);
            if (result.rowCount == 0) {
                Logger.log(`Job not found containing ${filters}`);
                return;
            }
            return result.rows;
        } catch (e) {
            Logger.error(e.message, e);
            throw new Error(e);
        }
    }
}
