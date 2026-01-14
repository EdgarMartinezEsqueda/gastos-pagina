import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";

@Controller("expenses")
export class ExpensesController {
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
        return "This action returns all expenses";
    }
    
    @Get("search")
    searchExpenses(@Query("query") description: {}) {
        console.log(description);
        return `This action searches for expenses`;
    }

    @Get(":id")
    getExpense(@Param("id") id: string) {
        return `This action returns a expense with id ${id}`;
    }

    @Post()
    createExpense(@Body() body: {}) {
        return `This action creates a new expense ${body}`;
    }

    @Put(":id")
    updateExpense(@Param("id") id: string) {
        return `This action updates a expense with id ${id}`;
    }

    @Delete(":id")
    deleteExpense(@Param("id") id: string) {
        return `This action delete a expense with id ${id}`;
    }
}
