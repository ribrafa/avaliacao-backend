import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import * as zxcvbn from 'zxcvbn';

@Injectable()
@ValidatorConstraint({async:true})
export class strongPassValidator implements ValidatorConstraintInterface{
    
    async validate(value: string, validationArguments?: ValidationArguments): Promise<boolean> {
        var validarSenha = false;
        if (value){
            const result = zxcvbn(value);        
            var validarSenha = (result.score <= 2) ;
        }
        
        return !validarSenha;
    }    
}

export const SenhaForte = (opcaoValidacao: ValidationOptions)=>{
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcaoValidacao,
            constraints: [],
            validator: strongPassValidator,
        })
    }
}