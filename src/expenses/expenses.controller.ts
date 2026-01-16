import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, ValidationPipe } from "@nestjs/common";
import { LoggerService } from "../logger/logger.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { QueryExpenseDto } from "./dto/query-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { ExpensesService } from "./expenses.service";

/**
 * Controller de Gastos
 * Maneja todos los endpoints de la API para gastos
 * Rutas base: /api/expenses
 */
@Controller("expenses")
export class ExpensesController {
  constructor(
    private readonly expensesService: ExpensesService,
    private readonly logger: LoggerService
  ) {}

  /**
   * GET /api/expenses
   * Obtiene todos los gastos con paginación y filtros opcionales
   * @query page - Número de página (default: 1)
   * @query limit - Cantidad de resultados por página (default: 10)
   * @query category - Filtrar por categoría (opcional)
   * @query query - Buscar en descripción (opcional)
   * @returns Objeto paginado con gastos y metadatos
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query(ValidationPipe) queryExpenseDto: QueryExpenseDto) {
    this.logger.log(`Obteniendo gastos con paginación: ${JSON.stringify(queryExpenseDto)}`,"ExpensesController" );
    return this.expensesService.findAll(queryExpenseDto);
  }

  /**
   * GET /api/expenses/search?query=
   * Busca gastos por descripción (IMPORTANTE: debe ir ANTES de :id)
   * @query query - Término de búsqueda
   * @returns Arreglo de gastos que coinciden
   */
  @Get("search")
  @HttpCode(HttpStatus.OK)
  async search(@Query("query") query: string) {
    this.logger.log(`Buscando gastos por descripción: ${query}`,"ExpensesController");
    return this.expensesService.findByDescription(query);
  }

  /**
   * GET /api/expenses/:id
   * Obtiene un gasto específico por ID
   * @param id - ID del gasto
   * @returns Gasto encontrado
   * @throws NotFoundException si el gasto no existe
   */
  @Get(":id")
  @HttpCode(HttpStatus.OK)
  async findOne(@Param("id", ParseIntPipe) id: number) {
    this.logger.log(`Obteniendo gasto con ID: ${id}`,"ExpensesController" );
    return this.expensesService.findOne(id);
  }

  /**
   * POST /api/expenses
   * Crea un nuevo gasto
   * @body createExpenseDto - DTO con datos del nuevo gasto
   * @returns Gasto creado
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createExpenseDto: CreateExpenseDto
  ) {
    this.logger.log( `Creando nuevo gasto: ${JSON.stringify(createExpenseDto)}`, "ExpensesController" );
    return this.expensesService.create(createExpenseDto);
  }

  /**
   * PUT /api/expenses/:id
   * Actualiza un gasto existente
   * @param id - ID del gasto a actualizar
   * @body updateExpenseDto - DTO con datos a actualizar
   * @returns Gasto actualizado
   * @throws NotFoundException si el gasto no existe
   */
  @Put(":id")
  @HttpCode(HttpStatus.OK)
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    updateExpenseDto: UpdateExpenseDto
  ) {
    this.logger.log( `Actualizando gasto con ID: ${id}`, "ExpensesController" );
    return this.expensesService.update(id, updateExpenseDto);
  }

  /**
   * DELETE /api/expenses/:id
   * Elimina un gasto existente
   * @param id - ID del gasto a eliminar
   * @returns Objeto con resultado de la operación
   * @throws NotFoundException si el gasto no existe
   */
  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  async remove(@Param("id", ParseIntPipe) id: number) {
    this.logger.log( `Eliminando gasto con ID: ${id}`, "ExpensesController" );
    return this.expensesService.remove(id);
  }
}
