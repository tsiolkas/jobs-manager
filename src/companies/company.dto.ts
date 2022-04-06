import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCompanyDTO {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsNumber()
    readonly vatNo: number;
}

export class UpdateCompanyDTO {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsNumber()
    readonly vatNo: number;

    @IsNotEmpty()
    @IsBoolean()
    readonly deleted: boolean;
}