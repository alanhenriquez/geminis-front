


/*///////////////////////////////////////////////////////////////////////////////////////////////*/
/*UTILS------------------------------------------------------------------------------------------*/
/*///////////////////////////////////////////////////////////////////////////////////////////////*/



// Util methods for manipulating objects ----------------------------------------------------------



/**
 * Actualiza un objeto con nuevas propiedades y valores sin modificar el objeto original.
 * @function objectUpdate
 * @param {Object} original - El objeto original que se quiere actualizar.
 * @param {Object} updates - Un objeto que contiene las actualizaciones a aplicar al objeto original.
 * @returns {Object} - Un nuevo objeto que es una copia del objeto original con las actualizaciones aplicadas.
 * 
 * @example
 * const original = { a: 1, b: 2 };
 * const updates = { b: 3, c: 4 };
 * const updated = objectUpdate(original, updates);
 * console.log(updated); // Output: { a: 1, b: 3, c: 4 }
 * 
 * @note
 * - La función crea una copia superficial del objeto original, lo que significa que las propiedades anidadas seguirán siendo referencias al mismo objeto.
 * - Las actualizaciones se aplican directamente al nuevo objeto, sin modificar el objeto original.
 * - Utiliza el operador de propagación (`...`) para crear la copia superficial del objeto original.
 * 
 * @internal
 * - Se utiliza `Object.prototype.hasOwnProperty.call` para verificar que las propiedades que se actualizan realmente pertenecen al objeto `updates`, evitando así la actualización de propiedades heredadas.
 * - Esta función es útil para situaciones donde se necesita crear un nuevo objeto basado en un objeto existente con ciertas actualizaciones, sin afectar el objeto original.
 */
function objectUpdate(original, updates) {
    // Crear una copia superficial del objeto original
    const updatedObject = { ...original };

    // Aplicar las actualizaciones en la copia
    for (const key in updates) {
        if (Object.prototype.hasOwnProperty.call(updates, key)) {
            updatedObject[key] = updates[key];
        }
    }

    return updatedObject;
}

/**
 * Transforma un objeto en un nuevo objeto donde cada clave tiene un prefijo añadido.
 * Esto es útil para generar variables CSS personalizadas u otros casos donde se necesite
 * añadir un prefijo a las claves de un objeto.
 *
 * @param {Object<string, string>} obj - Un objeto que contiene pares clave-valor,
 *                                       donde las claves son nombres y los valores son sus representaciones.
 * @param {string} [prefix="--"] - El prefijo que se añadirá a cada clave del objeto.
 *                                  Por defecto, el prefijo es `--`.
 * @param {boolean} [skipIfPrefixExists=false] - Indica si se debe omitir el prefijo en caso de que ya exista
 *                                               en la clave. Por defecto, es `false`, lo que significa que el prefijo
 *                                               siempre se añadirá, incluso si ya existe.
 * @returns {Object<string, string>} Un nuevo objeto donde cada clave del objeto original
 *                                    está precedida por el prefijo especificado (o no, dependiendo del parámetro
 *                                    `skipIfPrefixExists`), manteniendo los mismos valores.
 *
 * @example
 * const colors = { '--primary': '#3498db', secondary: '#2ecc71' };
 * const cssVariables = objectAddPrefixToKeys(colors);
 * console.log(cssVariables);
 * // Resultado: { '--primary': '#3498db', '--secondary': '#2ecc71' }
 *
 * @example
 * const colors = { '--primary': '#3498db', secondary: '#2ecc71' };
 * const cssVariables = objectAddPrefixToKeys(colors, '--', true);
 * console.log(cssVariables);
 * // Resultado: { '--primary': '#3498db', '--secondary': '#2ecc71' }
 * // En este caso, el prefijo no se duplica en '--primary'.
 *
 * @example
 * const settings = { theme: 'dark', fontSize: '16px' };
 * const prefixedSettings = objectAddPrefixToKeys(settings, 'config-', true);
 * console.log(prefixedSettings);
 * // Resultado: { 'config-theme': 'dark', 'config-fontSize': '16px' }
 */
function objectAddPrefixToKeys(obj, prefix = "--", skipIfPrefixExists = false) {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => {
            // Verificar si el prefijo ya existe en la clave
            if (skipIfPrefixExists && key.startsWith(prefix)) {
                // Si el prefijo ya existe y `skipIfPrefixExists` es true, no lo añadimos
                return [key, value];
            }
            // Añadir el prefijo a la clave
            return [`${prefix}${key}`, value];
        })
    );
}

/**
 * Desanida un objeto con objetos anidados en un único objeto plano.
 * Las claves de los objetos anidados se concatenan con un separador (por defecto `.`)
 * para evitar colisiones de nombres.
 *
 * @param {Object} obj - El objeto original, que puede contener objetos anidados.
 * @param {string} [separator="."] - El separador utilizado para concatenar las claves de los objetos anidados.
 *                                    Por defecto, el separador es `.`.
 * @param {string} [parentKey=""] - Clave padre utilizada internamente en la recursión para construir las claves combinadas.
 *                                   No es necesario proporcionar este parámetro al llamar a la función.
 * @returns {Object} Un nuevo objeto plano donde todas las propiedades anidadas se han combinado en un solo nivel.
 *
 * @example
 * const nestedObj = {
 *   user: {
 *     name: 'John',
 *     address: {
 *       city: 'New York',
 *       zip: '10001'
 *     }
 *   },
 *   settings: {
 *     theme: 'dark'
 *   }
 * };
 * const flatObj = objectFlatten(nestedObj);
 * console.log(flatObj);
 * // Resultado: {
 * //   'user.name': 'John',
 * //   'user.address.city': 'New York',
 * //   'user.address.zip': '10001',
 * //   'settings.theme': 'dark'
 * // }
 *
 * @example
 * const nestedObj = {
 *   a: 1,
 *   b: { c: 2, d: { e: 3 } }
 * };
 * const flatObj = objectFlatten(nestedObj, '_');
 * console.log(flatObj);
 * // Resultado: { 'a': 1, 'b_c': 2, 'b_d_e': 3 }
 */
function objectFlatten(obj, separator = ".", parentKey = "") {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        const newKey = parentKey ? `${parentKey}${separator}${key}` : key;

        if (value && typeof value === "object" && !Array.isArray(value)) {
            // Si el valor es un objeto, llamamos recursivamente a la función
            Object.assign(acc, objectFlatten(value, separator, newKey));
        } else {
            // Si el valor no es un objeto, lo agregamos al resultado
            acc[newKey] = value;
        }

        return acc;
    }, {});
}

/**
 * Realiza un reemplazo recursivo en los nombres de las claves de un objeto,
 * incluyendo objetos anidados.
 *
 * @param {Object} obj - El objeto original, que puede contener objetos anidados.
 * @param {string|RegExp} searchValue - El valor o expresión regular que se buscará en los nombres de las claves.
 *                                       Puede ser una cadena (e.g., "_") o una expresión regular (e.g., /_/g).
 * @param {string} replaceValue - El valor con el que se reemplazará el patrón buscado.
 * @returns {Object} Un nuevo objeto con los nombres de las claves modificados según el reemplazo especificado.
 *
 * @example
 * const nestedObj = {
 *   orange_018: '#FFA500',
 *   colors: {
 *     blue_023: '#0000FF',
 *     green_042: '#00FF00'
 *   }
 * };
 * const replacedObj = objectReplaceKeys(nestedObj, '_', '');
 * console.log(replacedObj);
 * // Resultado: {
 * //   orange018: '#FFA500',
 * //   colors: {
 * //     blue023: '#0000FF',
 * //     green042: '#00FF00'
 * //   }
 * // }
 *
 * @example
 * const nestedObj = {
 *   user_name: 'John',
 *   settings: {
 *     theme_mode: 'dark'
 *   }
 * };
 * const replacedObj = objectReplaceKeys(nestedObj, '_', '-');
 * console.log(replacedObj);
 * // Resultado: {
 * //   user-name: 'John',
 * //   settings: {
 * //     theme-mode: 'dark'
 * //   }
 * // }
 */
function objectReplaceKeys(obj, searchValue, replaceValue) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        // Reemplazar el patrón en el nombre de la clave
        const newKey = key.replace(searchValue, replaceValue);

        if (value && typeof value === "object" && !Array.isArray(value)) {
            // Si el valor es un objeto, llamamos recursivamente a la función
            acc[newKey] = objectReplaceKeys(value, searchValue, replaceValue);
        } else {
            // Si el valor no es un objeto, lo agregamos directamente
            acc[newKey] = value;
        }

        return acc;
    }, {});
}



/*///////////////////////////////////////////////////////////////////////////////////////////////*/
/*EXPORT-----------------------------------------------------------------------------------------*/
/*///////////////////////////////////////////////////////////////////////////////////////////////*/



export {
    objectUpdate,
    objectAddPrefixToKeys,
    objectFlatten,
    objectReplaceKeys
};