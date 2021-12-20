import { Beneficiario } from "./beneficiario";
import { Captacion } from "./captacion";
import { TipoDocumento } from "./tipoDocumento";

export class Asociado {
    idAsociado: number;
    tipoDocumento: TipoDocumento;
    numeroDocumento: string;
    nombres: string;
    primerApellido: string;
    segundoApellido: string;
    nombreCompleto: string;
    fechaNacimiento: string;
    beneficiarios: Beneficiario[];
}