import { Asociado } from "./asociado";
import { TipoCaptacion } from "./TipoCaptacion";
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