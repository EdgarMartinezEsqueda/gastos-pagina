import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ExpenseCategory } from "../enums/expense-category.enum";

/**
 * Entidad Expense representa un gasto en el sistema
 * Almacena información completa del gasto con timestamps automáticos
 */
@Entity({ name: "expenses" })
@Index(["category"])
@Index(["date"])
@Index(["description"])
export class Expense {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: number;

  @Column({
    type: "text",
    nullable: false,
  })
  description: string;

  @Column({
    type: "numeric",
    precision: 10,
    scale: 2,
    nullable: false,
  })
  amount: number;

  @Column({
    type: "timestamp",
    nullable: false,
  })
  date: Date;

  @Column({
    type: "varchar",
    length: 50,
    nullable: false,
    enum: ExpenseCategory,
  })
  category: ExpenseCategory;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  constructor(expense: Partial<Expense>) {
    Object.assign(this, expense);
  }
}
