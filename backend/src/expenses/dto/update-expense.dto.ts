import { PartialType } from "@nestjs/mapped-types";
import { CreateExpenseDto } from "./create-expense.dto";

/**
 * DTO para actualizar un gasto existente (todos los campos son opcionales)
 */
export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {}