import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, registerDecorator } from "class-validator";
import { UsuarioArmazenado } from "../usuario/usuario.dm";
import { Injectable } from "@nestjs/common";
 
@Injectable()
@ValidatorConstraint({async: true})
 
export class EmailUnicoValidator implements ValidatorConstraintInterface{
    constructor(private clsUsuariosArmazenados: UsuarioArmazenado){}
 
 
    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const validarEmail = await this.clsUsuariosArmazenados.validarEmail(value);
        return !validarEmail;
        // throw new Error("Method not implemented.");
    }
 
    // defaultMessage?(validationArguments?: ValidationArguments | undefined): string {
    //     throw new Error("Method not implemented.");
    // }
 
}
 
export const EmailUnico = (opcaoValidacao: ValidationOptions) => {
    return (object: Object, propriedade: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: propriedade,
            options: opcaoValidacao,
            constraints: [],
            validator: EmailUnicoValidator,
 
        })
    }
}