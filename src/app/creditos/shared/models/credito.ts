import { Asociado } from "src/app/asociado/models/asociado";

export class Credito {
    valor: number;
    plazo: number;
    tasaInteres: number;
    tasaInteresMora: number;
    deudor: Asociado;
}