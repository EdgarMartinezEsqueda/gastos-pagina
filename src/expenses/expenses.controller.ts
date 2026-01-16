import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, ValidationPipe } from "@nestjs/common";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpensesService } from "./expenses.service";

@Controller("expenses")
export class ExpensesController {

    constructor(private readonly expensesService: ExpensesService){}

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
        return this.expensesService.getAllExpenses();
    }
    
    @Get("search")
    async getExpensesByDescription(@Query("query") description: string) {
        return this.expensesService.getExpensesByDescription(description);
    }

    @Get(":id")
    async getExpense(@Param("id", ParseIntPipe) id: number) {
       return this.expensesService.getExpense(id);
    }

    @Post()
    async createExpense(@Body(ValidationPipe) createUserDto: CreateExpenseDto) {
        return this.expensesService.createExpense(createUserDto);
    }

    @Put(":id")
    async updateExpense(@Param("id", ParseIntPipe) id: number, @Body(ValidationPipe) updateExpenseDto: UpdateExpenseDto) {
        return this.expensesService.updateExpense(id, updateExpenseDto)
    }

    @Delete(":id")
    async deleteExpense(@Param("id", ParseIntPipe) id: number) {
        return this.expensesService.deleteExpense(id);
    }
}
