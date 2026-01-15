import { PartialType } from "@nestjs/mapped-types";
import { CreateExpenseDto } from "./create-extense.dto";

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {}