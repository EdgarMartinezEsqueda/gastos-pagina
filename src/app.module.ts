import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ExpensesController } from './expenses/expenses.controller';
import { ExpensesService } from './expenses/expenses.service';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [ExpensesModule],
  controllers: [AppController, ExpensesController],
  providers: [AppService, ExpensesService],
})
export class AppModule {}
