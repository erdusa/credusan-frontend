import { Asociado } from "./asociado";

export class Beneficiario {
    idBeneficiario: number;
    asociado: Asociado;
    nombres: string;
    primerApellido: string;
    segundoApellido: string;
    nombreCompleto: string;
    porcentaje: number;
}