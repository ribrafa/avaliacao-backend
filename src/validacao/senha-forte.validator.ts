import * as zxcvbn from 'zxcvbn';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, registerDecorator } from "class-validator";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({async: true})
 
export class StrongPassValidator implements ValidatorConstraintInterface{
 
    async validate(value: string, validationArguments?: ValidationArguments): Promise<boolean> {
        var validarSenha = true;
        if (value){
            const result = zxcvbn(value);
            var validarSenha = (result.score <= 2);
        }
        return !validarSenha;
        return true
    }
}
 
export const SenhaForte = (opcaoValidacao: ValidationOptions) => {
    return (object: Object, propriedade: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: propriedade,
            options: opcaoValidacao,
            constraints: [],
            validator: StrongPassValidator,
 
        })
    }
}