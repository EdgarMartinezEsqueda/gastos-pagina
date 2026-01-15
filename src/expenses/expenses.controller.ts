import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
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
    getAllExpenses() {
        return this.expensesService.getAllExpenses();
    }
    
    @Get("search")
    getExpensesByDescription(@Query("query") description: string) {
        return this.expensesService.getExpensesByDescription(description);
    }

    @Get(":id")
    getExpense(@Param("id", ParseIntPipe) id: number) {
       return this.expensesService.getExpense(id);
    }

    @Post()
    createExpense(@Body() expense: {description: string, amount: number, date: string, category: string}) {
        return this.expensesService.createExpense(expense);
    }

    @Put(":id")
    updateExpense(@Param("id", ParseIntPipe) id: number, @Body() updateExpense: { description?: string, amount?: number, date?: string, category?: string}) {
        return this.expensesService.updateExpense(id, updateExpense)
    }

    @Delete(":id")
    deleteExpense(@Param("id", ParseIntPipe) id: number) {
        return this.expensesService.deleteExpense(id);
    }
}
