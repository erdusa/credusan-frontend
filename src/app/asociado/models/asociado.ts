import { Beneficiario } from "./beneficiario";
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
    activo: boolean;
    beneficiarios: Beneficiario[];

}