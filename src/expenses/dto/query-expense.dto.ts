import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, Max, Min } from "class-validator";
import { ExpenseCategory } from "../enums/expense-category.enum";

/**
 * DTO para consultas con paginación y filtros
 */
export class QueryExpenseDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: "El page debe ser un número" })
  @IsPositive({ message: "El page debe ser positivo" })
  @Min(1, { message: "El page mínimo es 1" })
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: "El limit debe ser un número" })
  @IsPositive({ message: "El limit debe ser positivo" })
  @Min(1, { message: "El limit mínimo es 1" })
  @Max(100, { message: "El limit máximo es 100" })
  limit: number = 10;

  @IsOptional()
  @IsEnum(ExpenseCategory, {
    message: `La categoría debe ser una de: ${Object.values(ExpenseCategory).join(", ")}`
  })
  category?: ExpenseCategory;

  @IsOptional()
  @IsString({ message: "El query debe ser texto" })
  query?: string;
}
