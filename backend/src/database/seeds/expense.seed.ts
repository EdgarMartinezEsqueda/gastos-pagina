import { DataSource } from "typeorm";
import { Expense } from "../../expenses/entities/expense.entity";
import { ExpenseCategory } from "../../expenses/enums/expense-category.enum";

/**
 * Datos de seed para población inicial de la tabla expenses (Se ejecuta con: npm run seeds)
 * Incluye:
 * - 15 gastos variados
 * - Todas las categorías representadas
 * - Fechas distribuidas en el mes
 */
export const seedExpenses = async (dataSource: DataSource): Promise<void> => {
  const repository = dataSource.getRepository(Expense);

  // Verificar si ya existen datos
  const count = await repository.count();
  if (count > 0) {
    console.log( "La tabla expenses ya contiene datos. Saltando seed..." );
    return;
  }

  // Datos de gastos para seed
  const expenses: Partial<Expense>[] = [
    // Alimentación
    {
      description: "Almuerzo en restaurante",
      amount: 25.50,
      date: new Date("2024-01-15"),
      category: ExpenseCategory.ALIMENTACION,
    },
    {
      description: "Compra en supermercado",
      amount: 87.30,
      date: new Date("2024-01-10"),
      category: ExpenseCategory.ALIMENTACION,
    },
    {
      description: "Café en cafetería",
      amount: 5.50,
      date: new Date("2024-01-18"),
      category: ExpenseCategory.ALIMENTACION,
    },
    {
      description: "Cena familiar",
      amount: 120.00,
      date: new Date("2024-01-20"),
      category: ExpenseCategory.ALIMENTACION,
    },

    // Transporte
    {
      description: "Gasolina para auto",
      amount: 50.00,
      date: new Date("2024-01-14"),
      category: ExpenseCategory.TRANSPORTE,
    },
    {
      description: "Pasaje de autobús",
      amount: 2.50,
      date: new Date("2024-01-16"),
      category: ExpenseCategory.TRANSPORTE,
    },
    {
      description: "Uber a aeropuerto",
      amount: 35.75,
      date: new Date("2024-01-19"),
      category: ExpenseCategory.TRANSPORTE,
    },

    // Vivienda
    {
      description: "Pago de renta",
      amount: 800.00,
      date: new Date("2024-01-01"),
      category: ExpenseCategory.VIVIENDA,
    },
    {
      description: "Servicio de agua",
      amount: 45.00,
      date: new Date("2024-01-05"),
      category: ExpenseCategory.VIVIENDA,
    },
    {
      description: "Electricidad",
      amount: 120.00,
      date: new Date("2024-01-08"),
      category: ExpenseCategory.VIVIENDA,
    },

    // Entretenimiento
    {
      description: "Entrada cine",
      amount: 12.00,
      date: new Date("2024-01-12"),
      category: ExpenseCategory.ENTRETENIMIENTO,
    },
    {
      description: "Suscripción Netflix",
      amount: 15.99,
      date: new Date("2024-01-01"),
      category: ExpenseCategory.ENTRETENIMIENTO,
    },

    // Salud
    {
      description: "Consulta médica",
      amount: 75.00,
      date: new Date("2024-01-11"),
      category: ExpenseCategory.SALUD,
    },
    {
      description: "Medicinas farmacia",
      amount: 32.50,
      date: new Date("2024-01-17"),
      category: ExpenseCategory.SALUD,
    },

    // Educación
    {
      description: "Compra de libros",
      amount: 89.99,
      date: new Date("2024-01-13"),
      category: ExpenseCategory.EDUCACION,
    },

    // Otros
    {
      description: "Regalo para amigo",
      amount: 50.00,
      date: new Date("2024-01-21"),
      category: ExpenseCategory.OTROS,
    },
  ];
  
  try {
    // Crear instancias de Expense
    const expenseInstances = expenses.map((expense) =>
      repository.create(expense),
    );

    // Guardar en base de datos
    await repository.save(expenseInstances);

    console.log(`Se insertaron ${expenseInstances.length} gastos correctamente`);
  } catch (error) {
      console.error("Error al insertar gastos:", error.message);
    throw error;
  }
};
