import dayjs from "dayjs";
import { ListAvisoUsecase } from "../usecases/ListAvisoUsecase.js";
import { ICommands } from "./ICommands.js";

export class ListCommands implements ICommands {
    constructor(private readonly listAvisoUsecase: ListAvisoUsecase){}
    async execute(chatId: string, args: string[]): Promise<string> {
        const avisos = await this.listAvisoUsecase.execute(chatId)

        if (avisos.length === 0) {
            return "📭 Nenhum aviso encontrado.";
          }
          const lines = avisos.map((aviso, index) => {
            const dataFormatted = dayjs(aviso.data).format("DD/MM/YYYY")
            return `*${index + 1 }.* ${aviso.message}\n ${dataFormatted}\n Código: ${aviso.codigo}`
          })
          return `📋 *Lista de Avisos:*\n\n${lines.join("\n\n")}`
    }
}