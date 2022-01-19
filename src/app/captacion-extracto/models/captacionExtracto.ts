import { Captacion } from "src/app/captacion/models/captacion";

export class CaptacionExtracto {
    idCaptacionExtracto: number;
    captacion: Captacion;
    fecha: string;
    hora: string;
    valorDebito: number;
    valorCredito: number;
    valor: number;
}