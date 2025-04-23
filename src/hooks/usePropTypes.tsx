import { useEffect } from "react";



/*///////////////////////////////////////////////////////////////////////////////////////////////*/
/*UTILS------------------------------------------------------------------------------------------*/
/*///////////////////////////////////////////////////////////////////////////////////////////////*/



/*TYPES FUNCTIONS METHODS -----------------------------------------------------------------------*/



/**
 * Validadores de datos
 * @namespace validators
 */
const validators = {
    /**
     * Valida que el valor sea una cadena de texto (string).
     * @function
     * @param {*} prop - El valor a validar.
     * @returns {boolean|string} - Retorna true si es válido, de lo contrario retorna un mensaje de error.
     */
    string: (prop: any): boolean | string => typeof prop === 'string' ? true : `El valor '${prop}' no es una cadena de texto (string).`,

    /**
     * Valida que el valor sea un número.
     * @function
     * @param {*} prop - El valor a validar.
     * @returns {boolean|string} - Retorna true si es válido, de lo contrario retorna un mensaje de error.
     */
    number: (prop: any): boolean | string => typeof prop === 'number' ? true : `El valor '${prop}' no es un número.`,

    /**
     * Valida que el valor sea un booleano.
     * @function
     * @param {*} prop - El valor a validar.
     * @returns {boolean|string} - Retorna true si es válido, de lo contrario retorna un mensaje de error.
     */
    bool: (prop: any): boolean | string => typeof prop === 'boolean' ? true : `El valor '${prop}' no es un booleano.`,

    /**
     * Valida que el valor sea un arreglo.
     * @function
     * @param {*} prop - El valor a validar.
     * @returns {boolean|string} - Retorna true si es válido, de lo contrario retorna un mensaje de error.
     */
    array: (prop: any): boolean | string => Array.isArray(prop) ? true : `El valor '${prop}' no es un arreglo.`,

    /**
     * Valida que el valor sea un objeto.
     * @function
     * @param {*} prop - El valor a validar.
     * @returns {boolean|string} - Retorna true si es válido, de lo contrario retorna un mensaje de error.
     */
    object: (prop: any): boolean | string => (prop !== null && typeof prop === 'object' && !Array.isArray(prop)) ? true : `El valor '${prop}' no es un objeto.`,

    /**
     * Valida que el valor sea undefined.
     * @function
     * @param {*} prop - El valor a validar.
     * @returns {boolean|string} - Retorna true si es válido, de lo contrario retorna un mensaje de error.
     */
    undefined: (prop: any): boolean | string => typeof prop === 'undefined' ? true : `El valor '${prop}' no es undefined.`,

    /**
     * Valida que el valor sea null.
     * @function
     * @param {*} prop - El valor a validar.
     * @returns {boolean|string} - Retorna true si es válido, de lo contrario retorna un mensaje de error.
     */
    null: (prop: any): boolean | string => prop === null ? true : `El valor '${prop}' no es null.`,

    /**
     * Valida que el valor sea una función.
     * @function
     * @param {*} prop - El valor a validar.
     * @returns {boolean|string} - Retorna true si es válido, de lo contrario retorna un mensaje de error.
     */
    function: (prop: any): boolean | string => typeof prop === 'function' ? true : `El valor '${prop}' no es una función.`,

    /**
     * Valida que el valor sea un arreglo cuyos elementos cumplan con uno de los tipos especificados.
     * @function
     * @param {Array<string>} types - Los tipos de los elementos del arreglo.
     * @returns {Function} - Retorna una función que valida el arreglo.
     */
    arrayOf: (types: Array<string>): Function => (prop: any) => {
        if (!Array.isArray(types) || !types.every(type => typeof validators[type] === 'function')) {
            return 'El array de tipos proporcionado a arrayOf no es válido.';
        }
        if (types.length === 0) {
            return 'El array de tipos proporcionado a arrayOf no puede estar vacío.';
        }
        if (!Array.isArray(prop)) return `El valor '${prop}' no es un arreglo.`;
        const invalidItems = prop.filter(item => !types.some(type => validators[type](item) === true));
        return invalidItems.length === 0 ? true : `El arreglo contiene elementos inválidos: ${JSON.stringify(invalidItems)}`;
    },

    /**
     * Valida que el valor esté entre una de las opciones permitidas.
     * @function
     * @param {Array<*>} options - Las opciones permitidas.
     * @returns {Function} - Retorna una función que valida la opción.
     */
    oneOf: (options: Array<any>): Function => (prop: any) => {
        if (!Array.isArray(options)) {
            return 'El array de opciones proporcionado a oneOf no es válido.';
        }
        if (options.length === 0) {
            return 'El array de opciones proporcionado a oneOf no puede estar vacío.';
        }
        return options.includes(prop) ? true : `El valor '${prop}' no está entre las opciones permitidas: ${JSON.stringify(options)}`;
    },

    /**
     * Valida que el valor cumpla con uno de los tipos especificados.
     * @function
     * @param {Array<string>} types - Los tipos permitidos.
     * @returns {Function} - Retorna una función que valida el tipo.
     */
    oneOfType: (types: Array<string>): Function => (prop: any) => {
        if (!Array.isArray(types) || !types.every(type => typeof validators[type] === 'function')) {
            return 'El array de tipos proporcionado a oneOfType no es válido.';
        }
        if (types.length === 0) {
            return 'El array de tipos proporcionado a oneOfType no puede estar vacío.';
        }
        if (types.length === 1) {
            return validators[types[0]](prop);
        }
        if (types.some(type => validators[type](prop) === true)) {
            return true;
        }
        return types.some(type => validators[type](prop) === true) ? true : `El valor '${prop}' no cumple con ninguno de los tipos permitidos: ${JSON.stringify(types)}`;
    },

    /**
     * Valida que el valor sea una instancia de la clase especificada.
     * @function
     * @param {Function} clazz - La clase con la que se realizará la validación.
     * @returns {Function} - Retorna una función que valida la instancia.
     */
    instanceOf: (clazz: Function): Function => (prop: any) => {
        if (typeof clazz !== 'function') {
            return 'El validador instanceOf no es válido. Se esperaba una clase.';
        }
        if (typeof prop !== 'object' || prop === null) {
            return `El valor '${prop}' no es un objeto.`;
        }
        return prop instanceof clazz ? true : `El valor '${prop}' no es una instancia de ${clazz.name}.`;
    },

    /**
     * Valida que el valor sea un objeto que cumpla con la forma (shape) especificada.
     * @function
     * @param {Object} shapeObj - El objeto que define la estructura esperada para la validación.
     * @param {number} [strict=0] - El nivel de estrictitud para la validación de la estructura:
     *   - `0:` Valida solo las claves definidas en `shapeObj`. No se requiere que todas las claves estén presentes ni se validan claves adicionales.
     *   - `1:` No se permiten claves adicionales al objeto, y al menos una clave de `shapeObj` debe estar presente.
     *   - `2:` El objeto debe tener exactamente las mismas claves que `shapeObj`. No se permiten claves adicionales ni faltantes.
     * @returns {Function} - Retorna una función que valida el objeto comparándolo con la estructura definida en `shapeObj`.
     *   - Si la validación es exitosa, retorna `true`.
     *   - Si la validación falla, retorna un mensaje de error indicando qué parte del objeto no cumple con la validación.
     */
    shape: (shapeObj: object, strict: number = 0): Function => (prop: { [x: string]: any; } | null) => {
        if (typeof shapeObj !== 'object' || shapeObj === null || Array.isArray(shapeObj)) {
            return 'El objeto de forma proporcionado a shape no es válido. Debe ser un objeto no nulo y no un array.';
        }
        if (typeof prop !== 'object' || prop === null || Array.isArray(prop)) {
            return `El valor proporcionado no es un objeto. Valor recibido: ${JSON.stringify(prop)}.`;
        }
        if (strict < 0 || strict > 2) {
            return 'El valor de strict proporcionado a shape no es válido. Debe ser 0, 1 o 2.';
        }

        //validaciones de "strict"
        const validStrict = validators.number(strict);
        if (validStrict !== true) return validStrict + ` Debes corregir la propiedad [strict]`; 


        const keys = Object.keys(shapeObj);
        const propKeys = Object.keys(prop);

        // Nivel 2: Estrictamente la misma estructura
        if (strict === 2) {
            if (propKeys.length !== keys.length) {
                return `El objeto tiene claves adicionales o faltantes. Claves esperadas: ${JSON.stringify(keys)}, claves recibidas: ${JSON.stringify(propKeys)}.`;
            }
            const extraKeys = propKeys.filter(key => !keys.includes(key));
            if (extraKeys.length > 0) {
                return `El objeto tiene claves adicionales no permitidas: ${JSON.stringify(extraKeys)}. Elimina estas claves: ${JSON.stringify(extraKeys)}.`;
            }
        }

        // Nivel 1: No puede tener claves adicionales, pero permite que falten claves, aunque al menos una clave debe estar presente
        if (strict === 1) {
            const extraKeys = propKeys.filter(key => !keys.includes(key));
            if (extraKeys.length > 0) {
                return `El objeto tiene claves adicionales no permitidas: ${JSON.stringify(extraKeys)}. Elimina estas claves: ${JSON.stringify(extraKeys)}.`;
            }
            const hasAtLeastOneKey = keys.some(key => prop[key] !== undefined);
            if (!hasAtLeastOneKey) {
                return `El objeto debe tener al menos una clave de las esperadas: ${JSON.stringify(keys)}.`;
            }
        }

        // Validar las claves definidas en shapeObj (aplica para todos los niveles)
        for (let key of keys) {
            const types = Array.isArray(shapeObj[key]) ? shapeObj[key] : [shapeObj[key]];
            const isValid = types.some(type => {
                if (typeof type === 'string' && typeof validators[type] === 'function') {
                    return validators[type](prop[key]) === true;
                } else if (typeof type === 'object' && type.validator && typeof validators[type.validator] === 'function') {
                    return validators[type.validator](...Object.values(type).slice(1))(prop[key]) === true;
                } else if (typeof type === 'object' && !Array.isArray(type) && type !== null) {
                    return validators.shape(type, strict)(prop[key]) === true;
                }
                return false;
            });
            if (!isValid) {
                const expectedTypes = types.map(type => (typeof type === 'string' ? type : JSON.stringify(type)));
                return `La clave '${key}' del objeto no cumple con los tipos esperados. Valor recibido: ${JSON.stringify(validators.type(prop[key]))}. Tipos esperados: ${expectedTypes.join(', ')}.`;
            }
        }

        return true;  // Validación exitosa
    },

    /**
     * Valida que el valor esté dentro de un rango especificado.
     * @function
     * @param {number} min - El valor mínimo del rango.
     * @param {number} max - El valor máximo del rango.
     * @returns {Function} - Retorna una función que valida el rango.
     */
    range: (min: number, max: number): Function => (prop: number) => {
        if (typeof min !== 'number' || typeof max !== 'number') {
            return 'Los valores min y max proporcionados a range no son válidos.';
        }
        if (min > max) {
            return 'El valor min no puede ser mayor que el valor max.';
        }
        if (typeof prop !== 'number') {
            return `El valor '${prop}' no es un número.`;
        }
        if (prop < min || prop > max) {
            return `El valor '${prop}' no está dentro del rango esperado: [${min}, ${max}]`;
        }
        // Aplicar el validador range
        return (typeof prop === 'number' && prop >= min && prop <= max) ? true : `El valor '${prop}' no está dentro del rango esperado: [${min}, ${max}]`;
    },

    /**
     * Obtiene el tipo del valor proporcionado.
     * @function
     * @param {*} prop - El valor del que se obtendrá el tipo.
     * @returns {string} - Retorna el tipo del valor.
     */
    type: (prop: any): string => {
        if (validators.array(prop) === true) return 'array';
        if (validators.object(prop) === true) return 'object';
        if (validators.null(prop) === true) return 'null';
        if (validators.undefined(prop) === true) return 'undefined';
        if (validators.string(prop) === true) return 'string';
        if (validators.number(prop) === true) return 'number';
        if (validators.bool(prop) === true) return 'bool';
        if (validators.function(prop) === true) return 'function';
        return typeof prop;
    }
};



/*TYPES------------------------------------------------------------------------------------------*/



/**
 * Tipos básicos disponibles para validación.
 */
type BasicType = 'string' | 'number' | 'bool' | 'array' | 'object' | 'undefined' | 'null' | 'function';

/**
 * Define un validador básico.
 */
interface BasicValidator {
    type: BasicType;
}

/**
 * Define un validador para arreglos cuyos elementos cumplen con ciertos tipos.
 */
interface ArrayOfValidator {
    validator: 'arrayOf';
    types: BasicValidator[];
}

/**
 * Define un validador para valores que deben estar entre opciones permitidas.
 */
interface OneOfValidator {
    validator: 'oneOf';
    options: unknown[];
}

/**
 * Define un validador para valores que deben cumplir con uno de varios tipos.
 */
interface OneOfTypeValidator {
    validator: 'oneOfType';
    types: BasicValidator[];
}

/**
 * Define un validador para instancias de una clase específica.
 */
interface InstanceOfValidator {
    validator: 'instanceOf';
    clazz: new (...args: any[]) => any;
}

/**
 * Define un validador para objetos que cumplen con una estructura específica.
 */
interface ShapeValidator {
    validator: 'shape';
    shapeObj: Record<string, unknown>;
    strict: number; // 0: Relajado, 1: No claves adicionales, 2: Exacto
}

/**
 * Define un validador para valores dentro de un rango específico.
 */
interface RangeValidator {
    validator: 'range';
    min: number;
    max: number;
}

/**
 * Define todos los tipos de validadores disponibles.
 */
type usePropTypesValidator =
    | BasicValidator
    | ArrayOfValidator
    | OneOfValidator
    | OneOfTypeValidator
    | InstanceOfValidator
    | ShapeValidator
    | RangeValidator;



/*TYPES FUNCTIONS TYPE --------------------------------------------------------------------------*/



/**
 * Tipos de datos disponibles para validación
 * @namespace types
 */
const types = {
    /**
     * Valida que el valor sea una cadena de texto (string).
     * @type {string}
     */
    string: (): BasicValidator => ({ type: 'string' }),

    /**
     * Valida que el valor sea un número.
     * @type {string}
     */
    number: (): BasicValidator => ({ type: 'number' }),

    /**
     * Valida que el valor sea un booleano.
     * @type {string}
     */
    bool: (): BasicValidator => ({ type: 'bool' }),

    /**
     * Valida que el valor sea un arreglo.
     * @type {string}
     */
    array: (): BasicValidator => ({ type: 'array' }),

    /**
     * Valida que el valor sea un objeto.
     * @type {string}
     */
    object: (): BasicValidator => ({ type: 'object' }),

    /**
     * Valida que el valor sea undefined.
     * @type {string}
     */
    undefined: (): BasicValidator => ({ type: 'undefined' }),

    /**
     * Valida que el valor sea null.
     * @type {string}
     */
    null: (): BasicValidator => ({ type: 'null' }),

    /**
     * Valida que el valor sea una función.
     * @type {string}
     */
    function: (): BasicValidator => ({ type: 'function' }),

    /**
     * Valida que el valor sea un arreglo cuyos elementos cumplan con uno de los tipos especificados.
     * @function
     * @param {Array<string>} types - Los tipos de los elementos del arreglo.
     * @returns {Object} - Objeto con la validación 'arrayOf' y los tipos especificados.
     * @example
     * // Validar un arreglo de cadenas de texto y números
     * types.arrayOf([types.string, types.number])
     */
    arrayOf: (types: BasicValidator[]): ArrayOfValidator => ({ validator: 'arrayOf', types }),

    /**
     * Valida que el valor esté entre una de las opciones permitidas.
     * @function
     * @param {Array<*>} options - Las opciones permitidas.
     * @returns {Object} - Objeto con la validación 'oneOf' y las opciones especificadas.
     * @example
     * // Validar que el valor sea 'red', 'green' o 'blue'
     * types.oneOf(['red', 'green', 'blue'])
     */
    oneOf: (options: unknown[]): OneOfValidator => ({ validator: 'oneOf', options }),

    /**
     * Valida que el valor cumpla con uno de los tipos especificados.
     * @function
     * @param {Array<string>} types - Los tipos permitidos.
     * @returns {Object} - Objeto con la validación 'oneOfType' y los tipos especificados.
     * @example
     * // Validar que el valor sea una cadena de texto o un número
     * types.oneOfType([types.string, types.number])
     */
    oneOfType: (types: BasicValidator[]): OneOfTypeValidator => ({ validator: 'oneOfType', types: types }),

    /**
     * Valida que el valor sea una instancia de la clase especificada.
     * @function
     * @param {Function} clazz - La clase con la que se realizará la validación.
     * @returns {Object} - Objeto con la validación 'instanceOf' y la clase especificada.
     * @example
     * // Validar que el valor sea una instancia de Date
     * types.instanceOf(Date)
     */
    instanceOf: (clazz: new (...args: any[]) => any): InstanceOfValidator => ({ validator: 'instanceOf', clazz }),

    /**
     * Crea un validador que verifica si el valor es un objeto que cumple con la forma (shape) especificada.
     * @function
     * @param {Object} shapeObj - El objeto que define la estructura esperada para la validación.
     * @param {number} [strict=0] - El nivel de estrictitud para la validación de la estructura:
     *   - 0: Valida solo las claves definidas en `shapeObj`. No se requiere que todas las claves estén presentes ni se validan claves adicionales.
     *   - 1: No se permiten claves adicionales al objeto, y al menos una clave de `shapeObj` debe estar presente.
     *   - 2: El objeto debe tener exactamente las mismas claves que `shapeObj`. No se permiten claves adicionales ni faltantes.
     * @returns {Object} - Objeto con la validación 'shape', la forma especificada y el modo estricto.
     * @example
     * // Validar que el valor sea un objeto con una clave 'width' y 'height' que sean cadenas o undefined
     * types.shape({ width: types.string, height: types.oneOfType([types.string, types.undefined]) }, 1)
     * 
     * // Validar estrictamente que el objeto tenga exactamente las claves 'width' y 'height'
     * types.shape({ width: types.string, height: types.string }, 2)
     * 
     * // Validar de forma relajada (sin estrictitud) solo las claves especificadas en el shapeObj
     * types.shape({ width: types.string, height: types.string }, 0)
     */
    shape: (shapeObj: Record<string, unknown>, strict: number = 0): ShapeValidator => ({
        validator: 'shape',
        shapeObj,
        strict,
    }),

    /**
     * Valida que el valor esté dentro de un rango especificado.
     * @function
     * @param {number} min - El valor mínimo del rango.
     * @param {number} max - El valor máximo del rango.
     * @returns {Object} - Objeto con la validación 'range' y los valores mínimo y máximo especificados.
     * @example
     * // Validar que el valor esté entre 1 y 10
     * types.range(1, 10)
     */
    range: (min: number, max: number): RangeValidator => ({ validator: 'range', min, max }),
};



/*UTILS------------------------------------------------------------------------------------------*/



/**
 * Elimina una clave específica de un objeto.
 * 
 * @function
 * @param {Object} obj - El objeto del que se eliminará la clave.
 * @param {string} keyToRemove - La clave que se eliminará del objeto.
 * @returns {Object} - Un nuevo objeto sin la clave especificada.
 * @example
 * const originalObject = { a: 1, b: 2, c: 3 };
 * const newObject = removeKey(originalObject, 'b');
 * console.log(newObject); // { a: 1, c: 3 }
 */
const removeKey = <T extends object>(obj: T, keyToRemove: keyof T): Omit<T, keyof T> => {
    const { [keyToRemove]: _, ...rest } = obj;
    return rest as Omit<T, keyof T>;
};



/*///////////////////////////////////////////////////////////////////////////////////////////////*/
/*CUSTOM HOOK------------------------------------------------------------------------------------*/
/*///////////////////////////////////////////////////////////////////////////////////////////////*/



/**
 * Custom Hook para validar las propiedades (props) de un componente.
 * 
 * @version 1.0.0
 * 
 * @function usePropTypes
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} propTypes - Las definiciones de los tipos de propiedades.
 * 
 * @example
 * import usePropTypes, { types } from './usePropTypes';
 * 
 * const MyComponent = (props) => {
 *     const propTypes = {
 *         name: { type: types.string() },
 *         age: { type: types.number() },
 *         isActive: { type: types.bool() },
 *         tags: { type: types.arrayOf([types.string()]) },
 *         settings: { type: types.shape({
 *             theme: types.oneOf(['dark', 'light']),
 *             notifications: types.bool()
 *         }) }
 *     };
 * 
 *     usePropTypes(props, propTypes);
 * 
 *     return (
 *         <div>
 *             <h1>{props.name}</h1>
 *             <p>Age: {props.age}</p>
 *             <p>Active: {props.isActive ? 'Yes' : 'No'}</p>
 *             <ul>
 *                 {props.tags.map((tag, index) => (
 *                     <li key={index}>{tag}</li>
 *                 ))}
 *             </ul>
 *         </div>
 *     );
 * };
 * 
 * export default MyComponent;
 * 
 * @note
 * - El hook `usePropTypes` lanza un error si alguna de las propiedades no cumple con las definiciones de tipos proporcionadas.
 * - Los tipos disponibles para usar en `propTypes` están definidos en el objeto `types`.
 * - Para validaciones complejas, puedes combinar diferentes tipos utilizando `oneOfType` o `shape`.
 */
function usePropTypes<P extends Record<string, unknown>>(
    props: P,
    propTypes: Record<keyof P, { type: usePropTypesValidator }>
) {
    useEffect(() => {
        if (props && propTypes) {
            Object.entries(propTypes).forEach(([key, value]) => {
                const { type } = value;


                const validateType = (type: usePropTypesValidator, prop: unknown): boolean | string => {


                    // Extraer el tipo o validador principal
                    const validatorKey = typeof type === 'object' && 'validator' in type ? type.validator : typeof type === 'object' && 'type' in type ? type.type : type;
                    

                    // Validar el tipo o validador principal
                    switch (validatorKey) {
                        case 'string':
                        case 'number':
                        case 'bool':
                        case 'array':
                        case 'object':
                        case 'undefined':
                        case 'null':
                        case 'function': {
                            // Caso básico: tipos simples
                            const validatorFunction = validators[validatorKey];
                            if (typeof validatorFunction === 'function') {
                                return validatorFunction(prop);
                            } else {
                                return `El validador '${validatorKey}' no es válido.`;
                            }
                        }

                        case 'arrayOf': {
                            // Validador para arreglos con tipos específicos
                            const { types } = type as ArrayOfValidator;
                
                            // Procesar los tipos para asegurarnos de que sean cadenas
                            const processedTypes = types.map(t => (typeof t === 'object' && 'type' in t ? t.type : t));

                            // Validar que los tipos sean válidos
                            if (!processedTypes.every(t => typeof validators[t] === 'function')) {
                                return `
                                    El array de tipos proporcionado a arrayOf no es válido.
                                    Tipos válidos: ${Object.keys(validators).join(', ')}
                                    Tipos proporcionados: ${processedTypes.join(', ')}
                                `;
                            }
                            
                            // Aplicar el validador arrayOf
                            const validatorFunction = validators.arrayOf(processedTypes);
                            return validatorFunction(prop);
                        }

                        case 'oneOf': {
                            // Validador para valores dentro de opciones permitidas
                            const { options } = type as OneOfValidator;
                            const validatorFunction = validators.oneOf(options);
                            return validatorFunction(prop);
                        }

                        case 'oneOfType': {
                            // Validador para valores que cumplen con uno de varios tipos
                            const { types } = type as OneOfTypeValidator;

                            // Procesar los tipos para asegurarnos de que sean cadenas
                            const processedTypes = types.map(t => (typeof t === 'object' && 'type' in t ? t.type : t));

                            // Validar que los tipos sean válidos
                            if (!processedTypes.every(t => typeof validators[t] === 'function')) {
                                return `
                                    El array de tipos proporcionado a oneOfType no es válido.
                                    Tipos válidos: ${Object.keys(validators).join(', ')}
                                    Tipos proporcionados: ${processedTypes.join(', ')}
                                `;
                            }

                            // Aplicar el validador oneOfType
                            const validatorFunction = validators.oneOfType(processedTypes);
                            return validatorFunction(prop);
                        }

                        case 'instanceOf': {
                            // Validador para instancias de una clase específica
                            const { clazz } = type as InstanceOfValidator;

                            const validatorFunction = validators.instanceOf(clazz);
                            return validatorFunction(prop);
                        }

                        case 'shape': {
                            // Validador para objetos con una estructura específica
                            const { shapeObj, strict } = type as ShapeValidator;

                            // Validar la forma del objeto
                            const validatorFunction = validators.shape(shapeObj, strict);
                            return validatorFunction(prop);
                        }

                        case 'range': {
                            // Validador para valores dentro de un rango específico
                            const { min, max } = type as RangeValidator;
                            const validatorFunction = validators.range(min, max);
                            return validatorFunction(prop);
                        }

                        default: {
                            // Si el tipo no es reconocido, lanzar un error
                            throw new Error(`El tipo '${validatorKey}' no es válido.`);
                        }
                    }
                };


                const validationResult = validateType(type, props[key as keyof P]);
                if (validationResult !== true) {
                    const typeInfo = typeof type === 'object' && 'validator' in type ? removeKey(type, 'validator') : type;
                    throw new Error(
                        `
La propiedad '${key}' no es válida.
Valor recibido: ${JSON.stringify(props[key])}
Tipo de valor recibido: ${validators.type(props[key])}
Esperado: ${JSON.stringify(typeInfo)}
Error:
${validationResult}
                        `
                    );
                }
            });
        }
    }, [props, propTypes]);
}



/*///////////////////////////////////////////////////////////////////////////////////////////////*/
/*EXPORTS----------------------------------------------------------------------------------------*/
/*///////////////////////////////////////////////////////////////////////////////////////////////*/



export { validators, types, usePropTypesValidator };
export default usePropTypes;



/*///////////////////////////////////////////////////////////////////////////////////////////////*/
/*EJEMPLOS DE USO--------------------------------------------------------------------------------*/
/*///////////////////////////////////////////////////////////////////////////////////////////////*/



/* 
console.log(validators.string("Hello")); // true
console.log(validators.number(123)); // true
console.log(validators.bool(true)); // true
console.log(validators.array([1, 2, 3])); // true
console.log(validators.object({ key: "value" })); // true
console.log(validators.undefined(undefined)); // true
console.log(validators.null(null)); // true
console.log(validators.function(() => {})); // true
console.log(validators.arrayOf(['string', 'number'])(["hello", 123])); // true
console.log(validators.arrayOf(['string'])(["hello", 123])); // message...
console.log(validators.oneOf(['red', 'green', 'blue'])('red')); // true
console.log(validators.oneOf(['red', 'green', 'blue'])('yellow')); // message...
console.log(validators.oneOfType(['string', 'number'])(123)); // true
console.log(validators.oneOfType(['string', 'number'])(false)); // message...
console.log(validators.instanceOf(Date)(new Date())); // true
console.log(validators.instanceOf(Date)({})); // message...
console.log(validators.shape({ key: 'string' })({ key: "value" })); // true
console.log(validators.shape({ key: 'number' })({ key: "value" })); // message...
console.log(validators.shape({ key: ['string', 'number'] })({ key: "value" })); // true
console.log(validators.shape({ key: ['string', 'number'] })({ key: 123 })); // true
console.log(validators.shape({ key: ['string', 'number'] })({ key: true })); // message...
console.log(validators.shape({ nested: { key: 'string' } })({ nested: { key: "value" } })); // true
console.log(validators.shape({ nested: { key: 'number' } })({ nested: { key: "value" } })); // message...
console.log(validators.shape({ nested: { key: ['string', 'number'] } })({ nested: { key: "value" } })); // true
console.log(validators.shape({ nested: { key: 'number' } }, true)({ nested: { key: 0, alt: "cero" } })); // message...
console.log(validators.shape({ nested: { key: 'number' } }, true)({ nested: { key: 0 } })); // true
console.log(validators.range(1, 10)(5)); // true
console.log(validators.range(1, 10)(11)); // message...
*/