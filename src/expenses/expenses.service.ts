import { Injectable } from "@nestjs/common";

@Injectable()
export class ExpensesService {
    private expenses = [
        {
            id: 1,
            description: "Gasto en comida",
            amount: 100.89,
            date: new Date("2023-10-01"),
            category: "comida"
        },
        {
            id: 2,
            description: "Gasto en cine",
            amount: 333,
            date: new Date("2023-10-05"),
            category: "entretenimiento"
        },
        {
            id: 3,
            description: "Gasto en juegos",
            amount: 499,
            date: new Date("2023-10-02"),
            category: "entretenimiento"
        },
        {
            id: 4,
            description: "Gasto en medicina",
            amount: 499.99,
            date: new Date("2023-10-03"),
            category: "salud"
        }
    ]

    getAllExpenses() {
        return this.expenses
    }

    getExpense(id: number) {
        return this.expenses.find(expense => expense.id == id);
    }

    getExpensesByDescription(description: string){
        const response = this.expenses.filter(expense => expense.description.includes(description) );
        return response;
    }

    createExpense(expense: {description: string, amount: number, date: string, category: string} ){
        const id = this.expenses.length + 1;
        const fecha = new Date(expense.date) || new Date();
        this.expenses.push( {id, ...expense, date: fecha} );
        return "Creado"
    }

    updateExpense(id: number, updatedExpense: {description?: string, amount?: number, date?: string, category?: string}){
        const expense = this.getExpense(id);
        if (!expense)
            return("No encontrado");
        expense.description = updatedExpense.description ?? expense.description;
        expense.amount = updatedExpense.amount ?? expense.amount;
        expense.date = new Date(updatedExpense.date ?? expense.date);
        expense.category = updatedExpense.category ?? expense.category;
        
        return "Actualizado";
    }

    deleteExpense(id: number){
        const expense = this.getExpense(id);
        if (!expense)
            return("No encontrado");
        this.expenses = this.expenses.filter(expense => expense.id != id);
        return "Eliminado";
    }
}
