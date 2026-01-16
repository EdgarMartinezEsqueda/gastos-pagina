import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, ValidationPipe } from "@nestjs/common";
import { LoggerService } from "../logger/logger.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpensesService } from "./expenses.service";

@Controller("expenses")
export class ExpensesController {

    constructor(
        private readonly expensesService: ExpensesService,
        private readonly logger: LoggerService
    ){}

    /*
        GET /api/expenses - Listar gastos con paginación
        GET /api/expenses/search?query= - Buscar por descripción
        GET /api/expenses/:id - Obtener gasto específico
        POST /api/expenses - Crear nuevo gasto
        PUT /api/expenses/:id - Actualizar gasto
        DELETE /api/expenses/:id - Eliminar gasto
    */

    @Get()
    async getAllExpenses() {
        this.logger.log("Obteniendo todos los gastos", "ExpensesController");
        return this.expensesService.getAllExpenses();
    }
    
    @Get("search")
    async getExpensesByDescription(@Query("query") description: string) {
        this.logger.log(`Buscando gastos por descripción: ${description}`, "ExpensesController");
        return this.expensesService.getExpensesByDescription(description);
    }

    @Get(":id")
    async getExpense(@Param("id", ParseIntPipe) id: number) {
        this.logger.log(`Obteniendo gasto con ID: ${id}`, "ExpensesController");
       return this.expensesService.getExpense(id);
    }

    @Post()
    async createExpense(@Body(ValidationPipe) createUserDto: CreateExpenseDto) {
        this.logger.log(`Creando nuevo gasto: ${JSON.stringify(createUserDto)}`, "ExpensesController");
        return this.expensesService.createExpense(createUserDto);
    }

    @Put(":id")
    async updateExpense(@Param("id", ParseIntPipe) id: number, @Body(ValidationPipe) updateExpenseDto: UpdateExpenseDto) {
        this.logger.log(`Actualizando gasto con ID: ${id}`, "ExpensesController");
        return this.expensesService.updateExpense(id, updateExpenseDto)
    }

    @Delete(":id")
    async deleteExpense(@Param("id", ParseIntPipe) id: number) {
        this.logger.log(`Eliminando gasto con ID: ${id}`, "ExpensesController");
        return this.expensesService.deleteExpense(id);
    }
}
