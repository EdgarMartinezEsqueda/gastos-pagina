import { ConsoleLogger, Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class LoggerService extends ConsoleLogger{
    private logsDir = path.join(process.cwd(), "logs");

    constructor() {
        super();
        this.ensureLogsDirectory();
    }

    private ensureLogsDirectory() {
        if (!fs.existsSync(this.logsDir)) {
            fs.mkdirSync(this.logsDir, { recursive: true });
        }
    }

    private writeToFile(level: string, message: string, context?: string) {
        try {
            const date = new Date();
            const dateStr = date.toISOString();
            const fileName = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}.log`;
            const filePath = path.join(this.logsDir, fileName);
            const logMessage = `[${dateStr}] [${level}] ${context ? `[${context}]` : ""} ${message}\n`;

            fs.appendFileSync(filePath, logMessage);
        } catch (error) {
            throw new Error("Error al escribir en archivo de logs:", error);
        }
    }

    log(message: string, context?: string){
        const date = new Date();

        super.log(`[${date.toISOString()}] ${message}`, context);
        this.writeToFile("LOG", message, context);
    }

    error(message: any, stackOrContext?: string){
        const date = new Date();
        super.error(`[${date.toISOString()}] ${message}`, stackOrContext);
        this.writeToFile("ERROR", message, stackOrContext);
    }

    warn(message: string, context?: string) {
        const date = new Date();
        super.warn(`[${date.toISOString()}] ${message}`, context);
        this.writeToFile("WARN", message, context);
    }

    debug(message: string, context?: string) {
        const date = new Date();
        super.debug(`[${date.toISOString()}] ${message}`, context);
        this.writeToFile("DEBUG", message, context);
    }
}
