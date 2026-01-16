import { NestFactory } from "@nestjs/core";
import { DataSource } from "typeorm";
import { AppModule } from "../../app.module";
import { seedExpenses } from "./expense.seed";

async function runSeeds() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  try {
    console.log("Iniciando seeds...");
    
    await seedExpenses(dataSource);
    
    console.log("Seeds completados exitosamente");
  } catch (error) {
    console.error("Error ejecutando seeds:", error);
  } finally {
    await app.close();
  }
}

runSeeds();