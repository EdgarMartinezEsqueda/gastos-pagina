import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "expenses" }) 
export class Expense {
    @PrimaryGeneratedColumn("increment", { type: "bigint" })
    id: number;

    @Column({ 
        type: "text", 
        nullable: false 
    })
    description: string;

    @Column({ 
        type: "numeric", 
        precision: 10, 
        scale: 2, 
        nullable: false 
    })
    amount: number;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        nullable: false,
    })
    date: Date;

    @Column({ 
        type: "varchar", 
        length: 50, 
        nullable: false 
    })
    category: string;
}
