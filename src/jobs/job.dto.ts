import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateJobDTO {
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsNumber()
    readonly company_id: number;
}

export class UpdateJobDTO {
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsNumber()
    readonly company_id: number;

    @IsNotEmpty()
    @IsBoolean()
    readonly deleted: boolean;
}

export class FilterJobDTO {
    @IsNotEmpty()
    @IsString()
    readonly query: string;
}