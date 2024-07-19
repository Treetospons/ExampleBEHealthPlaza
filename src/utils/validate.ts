import { query, ResultFactory, validationResult } from 'express-validator';


export const ValidationResult: ResultFactory<string> = validationResult.withDefaults({
    formatter: error => error.msg as string,
});