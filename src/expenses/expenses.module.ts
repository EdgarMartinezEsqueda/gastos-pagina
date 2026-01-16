import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoggerModule } from "../logger/logger.module";
import { Expense } from "./entities/expense.entity";
import { ExpensesController } from "./expenses.controller";
import { ExpensesService } from "./expenses.service";

@Module({
    imports: [TypeOrmModule.forFeature([ Expense ]), LoggerModule],
    controllers: [ ExpensesController],
    providers: [ ExpensesService],
})
export class ExpensesModule {}
