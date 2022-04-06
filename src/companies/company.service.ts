import { Logger, Injectable } from '@nestjs/common';
import { SharedService } from '../shared/shared.service';
import { CreateCompanyDTO, UpdateCompanyDTO } from './company.dto';

@Injectable()
export class CompanyService {

    constructor(
        private readonly sharedService: SharedService
    ) { }

    async createCompany(company: CreateCompanyDTO): Promise<any> {
        const query: string = `INSERT INTO companies (name, vatNo) VALUES ($1, $2) RETURNING *;`;
        const params = [company.name, company.vatNo];
        try {
            const result = await this.sharedService.query(query, params);
            if(result.rowCount==1){
                Logger.log(`Company ${result.rows[0].id} inserted`)
                return result.rows[0];
            }
            throw new Error(`Error on inserting new company with name: ${company.name}`)
        } catch (e) {
            Logger.error(e.message, e);
            throw new Error(e);
        }
    }

    async updateCompany(company: UpdateCompanyDTO, companyId: number): Promise<any> {
        const changes: any = this.sharedService.createUpdateChanges(company);
        const query: string = `UPDATE companies SET ${changes.changes} WHERE id=$${changes.index} RETURNING *;`;
        const params = [...changes.params,companyId]
        try {
            const result = await this.sharedService.query(query, params);
            if (result.rowCount == 1) {
                Logger.log(`Company with id ${result.rows[0].id} updated`)
                return result.rows[0];
            }
            else
                return null;
        } catch (e) {
            Logger.error(e.message, e);
            throw new Error(e);
        }
    }

    async deleteCompany(companyId: number): Promise<any> {
        const query: string = `UPDATE companies SET deleted=true WHERE id=$1;`;
        const params = [companyId]
        try {
            const result = await this.sharedService.query(query, params);
            if (result.rowCount == 1) {
                Logger.log(`Company with id: ${companyId} deleted`)
                return result.rowCount;
            }
            else
                return null;
        } catch (e) {
            Logger.error(e.message, e);
            throw new Error(e);
        }
    }
}
