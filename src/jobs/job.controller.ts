import { Controller, Post, UseGuards, Put, Delete, Body, Param, Get, Query, Logger, Res } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt.guards';
import { CreateJobDTO, FilterJobDTO, UpdateJobDTO } from './job.dto';
import { JobService } from './job.service';

@Controller('job')
export class JobController {

    constructor(
        private readonly jobService: JobService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createJob(@Body() job: CreateJobDTO): Promise<any> {
        try {
            Logger.log(`Create job with title: ${job.title}`);
            return await this.jobService.createJob(job);
        } catch (e) {
            Logger.error(e.message, e);
            throw new Error(e);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateJob(@Body() job: UpdateJobDTO, @Param('id') jobId: number, @Res() res): Promise<any> {
        try {
            Logger.log(`Update job with id: ${jobId}`);
            const result = await this.jobService.updateJob(job, jobId);
            if (result)
                res.status(200).send(result)
            else
                res.status(404).send()
        } catch (e) {
            Logger.error(e.message, e);
            throw new Error(e);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteJob(@Param('id') jobId: number, @Res() res) {
        try {
            Logger.log(`Delete job with id: ${jobId}`);
            const result = await this.jobService.deleteJob(jobId);
            if (result)
                res.status(200).send()
            else
                res.status(404).send()
        } catch (e) {
            Logger.error(e.message, e);
            throw new Error(e);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async filterJob(@Query() params: FilterJobDTO, @Res() res) {
        try {
            Logger.log(`Filter job with: ${params.query}`);
            const result =  await this.jobService.filter(params.query);
            if(result)
                res.status(200).send(result)
            else
                res.status(404).send()
        } catch (e) {
            Logger.error(e.message, e);
            throw new Error(e);
        }
    }
}
