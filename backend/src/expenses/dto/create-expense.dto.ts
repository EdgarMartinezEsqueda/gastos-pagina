import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, MinLength } from "class-validator";
import { ExpenseCategory } from "../enums/expense-category.enum";

/**
 * DTO para crear un nuevo gasto
 * Incluye validación de tipos de datos, formatos y rangos
 */
export class CreateExpenseDto {
  @IsNotEmpty({ message: "La descripción es requerida" })
  @IsString({ message: "La descripción debe ser texto" })
  @MinLength(3, { message: "La descripción debe tener al menos 3 caracteres" })
  @MaxLength(255, { message: "La descripción no puede exceder 255 caracteres" })
  description: string;

  @IsNotEmpty({ message: "El monto es requerido" })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: "El monto debe ser un número con máximo 2 decimales" }
  )
  @IsPositive({ message: "El monto debe ser positivo" })
  amount: number;

  @IsNotEmpty({ message: "La fecha es requerida" })
  @IsDate({ message: "La fecha debe ser válida" })
  @Type(() => Date)
  date: Date;

  @IsNotEmpty({ message: "La categoría es requerida" })
  @IsEnum(ExpenseCategory, {
    message: `La categoría debe ser una de: ${Object.values(ExpenseCategory).join(", ")}`,
  })
  category: ExpenseCategory;
}