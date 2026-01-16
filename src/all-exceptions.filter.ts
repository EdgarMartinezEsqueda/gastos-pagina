import { ArgumentsHost, Catch, HttpException, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter, HttpAdapterHost } from "@nestjs/core";
import { Request, Response } from "express";
import { EntityNotFoundError, QueryFailedError } from "typeorm";
import { LoggerService } from "./logger/logger.service";

type ResponseBody = {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string | object;
};

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

    const responseObj: ResponseBody = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: "Internal server error",
    };

    if (exception instanceof HttpException) {
      responseObj.statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      responseObj.message = typeof exceptionResponse === "object"
        ? (exceptionResponse as any).message || exception.message
        : exceptionResponse;
        
      this.logger.warn(
        `HTTP ${responseObj.statusCode}: ${request.method} ${request.url}`,
        exception.stack
      );
      
    } else if (exception instanceof QueryFailedError) {
      responseObj.statusCode = HttpStatus.BAD_REQUEST;
      responseObj.message = "Error en la consulta a la base de datos";
      this.logger.error("Query failed", exception.message);
      
    } else if (exception instanceof EntityNotFoundError) {
      responseObj.statusCode = HttpStatus.NOT_FOUND;
      responseObj.message = "No se encontró la entidad solicitada";
      this.logger.error("Entity not found", exception.message);
      
    } else {
      this.logger.error("Unhandled exception", exception.stack || exception.message);
    }

    response.status(responseObj.statusCode).json(responseObj);
    super.catch(exception, host);
  }
}