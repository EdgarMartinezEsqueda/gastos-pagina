import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { QueryExpenseDto } from "./dto/query-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { Expense } from "./entities/expense.entity";

/**
 * Service de Gastos
 * Contiene toda la lógica de negocio para gestión de gastos
 * Implementa CRUD, paginación, búsqueda y filtrado
 */
@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>
  ) {}

  /**
   * Obtiene todos los gastos con paginación y filtros
   * @param query - Parámetros de paginación y filtro (page, limit, category, query)
   * @returns Objeto con datos paginados y metadatos
   */
  async findAll(query: QueryExpenseDto) {
    try {
      const { page = 1, limit = 10, category, query: searchQuery } = query;
      const skip = (page - 1) * limit;

      let queryBuilder = this.expenseRepository.createQueryBuilder("expense");

      // Aplicar filtro de categoría
      if (category) 
        queryBuilder = queryBuilder.where("expense.category = :category", {
          category,
        });

      // Aplicar búsqueda en descripción
      if (searchQuery) {
        queryBuilder = queryBuilder.andWhere(
          "expense.description ILIKE :searchQuery",
          {
            searchQuery: `%${searchQuery}%`,
          },
        );
      }

      // Ordenar por fecha descendente
      queryBuilder = queryBuilder.orderBy("expense.date", "DESC");

      // Aplicar paginación
      const [data, total] = await queryBuilder.skip(skip).take(limit).getManyAndCount();

      const totalPages = Math.ceil(total / limit);

      return {
        data,
        meta: { total, page, limit, totalPages }
      };
    } catch (error) {
      throw new BadRequestException(
        `Error al obtener gastos: ${error.message}`,
      );
    }
  }

  /**
   * Obtiene un gasto por su ID
   * @param id - ID del gasto a obtener
   * @returns Gasto encontrado
   * @throws NotFoundException si el gasto no existe
   */
  async findOne(id: number): Promise<Expense> {
    try {
      const expense = await this.expenseRepository.findOne({ where: { id } });

      if (!expense) 
        throw new NotFoundException(`Gasto con ID ${id} no encontrado`);

      return expense;
    } catch (error) {
      if (error instanceof NotFoundException) 
        throw error;
      
      throw new BadRequestException(`Error al obtener gasto: ${error.message}`);
    }
  }

  /**
   * Busca gastos por descripción
   * @param query - Término de búsqueda
   * @returns Arreglo de gastos que coinciden
   */
  async findByDescription(query: string): Promise<Expense[]> {
    try {
      if (!query || query.trim().length === 0)
        return this.expenseRepository.find({
          order: { date: "DESC" },
        });

      return this.expenseRepository.find({ 
        where: { description: ILike(`%${query.trim()}%`) }, 
        order: { date: "DESC" }, 
      });
    } catch (error) {
      throw new BadRequestException(`Error en búsqueda: ${error.message}`);
    }
  }

  /**
   * Crea un nuevo gasto
   * @param createExpenseDto - DTO con datos del nuevo gasto
   * @returns Gasto creado
   */
  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    try {
      const expense = this.expenseRepository.create(createExpenseDto);
      return this.expenseRepository.save(expense);
    } catch (error) {
      throw new BadRequestException(`Error al crear gasto: ${error.message}`);
    }
  }

  /**
   * Actualiza un gasto existente
   * @param id - ID del gasto a actualizar
   * @param updateExpenseDto - DTO con datos a actualizar
   * @returns Gasto actualizado
   * @throws NotFoundException si el gasto no existe
   */
  async update( id: number, updateExpenseDto: UpdateExpenseDto ): Promise<Expense> {
    try {
      // Validar que el gasto existe
      await this.findOne(id);

      await this.expenseRepository.update(id, updateExpenseDto);

      return this.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) 
        throw error;
      
      throw new BadRequestException(`Error al actualizar gasto: ${error.message}`);
    }
  }

  /**
   * Elimina un gasto (hard delete)
   * @param id - ID del gasto a eliminar
   * @returns Objeto con resultado de la operación
   * @throws NotFoundException si el gasto no existe
   */
  async remove( id: number): Promise<{ success: boolean; message: string }> {
    try {
      // Validar que el gasto existe antes de eliminar
      await this.findOne(id);

      const result = await this.expenseRepository.delete(id);

      if (result.affected === 0) 
        throw new NotFoundException(`Gasto con ID ${id} no encontrado`);

      return {
        success: true,
        message: `Gasto con ID ${id} eliminado correctamente`
      };
    } catch (error) {
      if (error instanceof NotFoundException) 
        throw error;
      
      throw new BadRequestException(`Error al eliminar gasto: ${error.message}`);
    }
  }
}
