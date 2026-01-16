import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { Expense } from "./entities/expense.entity";

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepo: Repository<Expense>,
  ) {}

  async getAllExpenses() {
    return this.expenseRepo.find();
  }

  async getExpense(id: number) {
    const expense = await this.expenseRepo.findOne({ where: { id } });

    if (!expense) 
        throw new NotFoundException(`No se encontró gasto con id ${id}`);

    return expense;
  }

  async getExpensesByDescription(description: string) {
    if(!description)
        return this.expenseRepo.find();

    const response = await this.expenseRepo.find({
      where: description ? { description: ILike(`%${description}%`) } : {}, // Buscar sin ser sensible a mayúsculas/minúsculas
    });
    
    return response;
  }

  async createExpense(createExpenseDto: CreateExpenseDto) {
    const expense = this.expenseRepo.create(createExpenseDto);

    return this.expenseRepo.save(expense);
  }

  async updateExpense(id: number, updatedExpenseDto: UpdateExpenseDto) {
    const result = await this.expenseRepo.update(id, updatedExpenseDto);

    if (result.affected === 0)
      throw new NotFoundException(`No se encontró gasto con id ${id}`);

    return this.getExpense(id);
  }

  async deleteExpense(id: number) {
    const result = await this.expenseRepo.delete(id);

    if (result.affected === 0)
      throw new NotFoundException(`No se encontró gasto con id ${id}`);

    return "Eliminado";
  }
}
