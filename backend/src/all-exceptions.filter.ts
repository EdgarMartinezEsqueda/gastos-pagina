import { ArgumentsHost, BadRequestException, Catch, HttpException, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter, HttpAdapterHost } from "@nestjs/core";
import { Request, Response } from "express";
import { EntityNotFoundError, QueryFailedError } from "typeorm";
import { LoggerService } from "./logger/logger.service";

/**
 * Estructura estandarizada para respuestas de error
 */
type ErrorResponse = {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string | object;
  error?: string;
};

/**
 * Captura de las excepciones no manejadas y las formatea en base al ErrorResponse anterior
 */
@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(
    httpAdapterHost: HttpAdapterHost,
    private readonly logger: LoggerService
  ) {
    super(httpAdapterHost.httpAdapter);
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorResponse: ErrorResponse = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: "Internal server error",
      error: "Internal Server Error",
    };

    if (exception instanceof HttpException) {
      errorResponse.statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === "object") {
        const objResponse = exceptionResponse as any;
        errorResponse.message = objResponse.message || exception.message;
        errorResponse.error = objResponse.error;
      } else {
        errorResponse.message = exceptionResponse;
      }

      this.logger.warn(
        `HTTP ${errorResponse.statusCode}: ${request.method} ${request.url}`,
        exception.message,
      );
    } else if (exception instanceof QueryFailedError) {
      errorResponse.statusCode = HttpStatus.BAD_REQUEST;
      errorResponse.message = "Error en la consulta a la base de datos";
      errorResponse.error = "Database Error";

      this.logger.error(
        "Query failed",
        exception.message,
      );
    } else if (exception instanceof EntityNotFoundError) {
      errorResponse.statusCode = HttpStatus.NOT_FOUND;
      errorResponse.message = "No se encontró la entidad solicitada";
      errorResponse.error = "Not Found";

      this.logger.error(
        "Entity not found",
        exception.message,
      );
    } else if (exception instanceof BadRequestException) {
      errorResponse.statusCode = HttpStatus.BAD_REQUEST;
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === "object") {
        const objResponse = exceptionResponse as any;
        errorResponse.message = objResponse.message || exception.message;
        errorResponse.error = objResponse.error || "Bad Request";
      } else {
        errorResponse.message = exceptionResponse;
        errorResponse.error = "Bad Request";
      }

      this.logger.warn(
        `Bad Request: ${request.method} ${request.url}`,
        exception.message,
      );
    } else {
      this.logger.error(
        "Unhandled exception",
        exception.stack || exception.message,
      );
    }

    response.status(errorResponse.statusCode).json(errorResponse);
  }
}