import { Asociado } from "src/app/asociado/models/asociado";
import { TipoCaptacion } from "./tipoCaptacion";
import { TipoEstadoCaptacion } from "./tipoEstadoCaptacion";

export class Captacion {
    idCaptacion: number;
    tipoCaptacion: TipoCaptacion
    numeroCuenta: number;
    asociado: Asociado;
    tipoEstadoCaptacion: TipoEstadoCaptacion;
    fechaApertura: string;
    saldo: number;
}