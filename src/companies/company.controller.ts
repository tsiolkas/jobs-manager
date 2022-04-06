import { Controller, Post, UseGuards, Put, Delete, Body, Param, Logger, Res } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt.guards';
import { CreateCompanyDTO, UpdateCompanyDTO } from './company.dto';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {

    constructor(
        private readonly companyService: CompanyService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createCompany(@Body() company: CreateCompanyDTO): Promise<any> {
        try {
            Logger.log(`Create company with name: ${company.name}`);
            return await this.companyService.createCompany(company);
        } catch (e) {
            Logger.error(e.message, e);
            throw new Error(e);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateCompany(@Body() company: UpdateCompanyDTO, @Param('id') companyId: number, @Res() res): Promise<any> {
        try {
            Logger.log(`Update company with id: ${companyId}`);
            const result = await this.companyService.updateCompany(company, companyId);
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
    async deleteCompany(@Param('id') companyId: number, @Res() res): Promise<void>{
        try{
            Logger.log(`Delete company with id: ${companyId}`);
            const result = await this.companyService.deleteCompany(companyId);
            if (result)
                res.status(200).send()
            else
                res.status(404).send()
        } catch (e) {
            Logger.error(e.message, e);
            throw new Error(e);
        }
    }
}
