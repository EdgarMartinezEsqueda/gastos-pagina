import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateExpenseDto {
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsString()
    date: string;
    
    @IsNotEmpty()
    @IsString()
    category: string;
}