import { objectAddPrefixToKeys, objectFlatten, objectReplaceKeys, objectUpdate } from "../utils/utils";
import colors from "./colors";



/*///////////////////////////////////////////////////////////////////////////////////////////////*/
/*CONSTANTS--------------------------------------------------------------------------------------*/
/*///////////////////////////////////////////////////////////////////////////////////////////////*/



const prefix = '--';
const separator = '-';
const skipIfPrefixExist = true;
const colors_prepared = objectReplaceKeys(
    objectAddPrefixToKeys(
        objectFlatten(
            colors, 
            separator
        ), 
        prefix, 
        skipIfPrefixExist
    ), 
    "_", 
    separator
); 



/*///////////////////////////////////////////////////////////////////////////////////////////////*/
/*THEMES-----------------------------------------------------------------------------------------*/
/*///////////////////////////////////////////////////////////////////////////////////////////////*/
/* 
    ~~~ VARIABLES (PERSISTENTS).
    -   Son variables que se aplican a todos los themes, y no cambian de un theme a otro
    -   No realizar anidamientos, solo debe ser un objeto de key-value, donde {key} es la variable css, y {value} es una string
*/



const persistents = {
    ...colors_prepared
    //agregar mas de ser necesario
}



/*///////////////////////////////////////////////////////////////////////////////////////////////*/
/*THEMES-----------------------------------------------------------------------------------------*/
/*///////////////////////////////////////////////////////////////////////////////////////////////*/
/* 
    ~~~ Define aqui tus (THEMES).
    -   Son variables que se aplican a cada theme, y cambian de un theme a otro
    -   Puedes agregar tantas variables como quieras, pero asegurate de que cada theme tenga las mismas 
        variables aunque tengan diferentes valores, esto para evitar problemas de presencia en un 
        theme y en el otro no
    -   No realizar anidamientos, solo debe ser un objeto de key-value, donde {key} es la variable css, y {value} es una string
*/



const light = objectUpdate({}, {


    
});

const dark = objectUpdate({}, {
    

    
})



/*///////////////////////////////////////////////////////////////////////////////////////////////*/
/*EXPORTABLES------------------------------------------------------------------------------------*/
/*///////////////////////////////////////////////////////////////////////////////////////////////*/
/* 
    ~~~ EXPORTAMOS LOS (THEMES).
    -   Es un array de objetos, cada objeto de array [{...},{...},...] representa un theme. 
        La {key} unica que cada objeto presente, sera el nombre del theme, y su {value}, son la 
        variables creadas en la seccion previa {THEMES}
    -   Los themes se exportan como un array de objetos, donde cada objeto representa un theme
        y sus variables css
    -   Asegurate de que sean objetos con keys de prefijo (--), es requerido al representar nombres de variables css
*/



// Exporta los temas como un array de objetos
const __THEMES = [
    { 'light': objectAddPrefixToKeys(light, prefix, skipIfPrefixExist) },
    { 'dark': objectAddPrefixToKeys(dark, prefix, skipIfPrefixExist) }
];



// Extrae nombres y valores de los temas para facilitar su uso
const __THEMES_NAMES = __THEMES.map((theme) => Object.keys(theme)[0]);
const __THEMES_VALUES = __THEMES.map((theme) => Object.values(theme)[0]);



// Variables persistentes y colores preparados también se exportan
const __THEMES_PERSISTENTS = objectAddPrefixToKeys(persistents, prefix, skipIfPrefixExist);
const __THEMES_COLORS = colors_prepared;   



/*///////////////////////////////////////////////////////////////////////////////////////////////*/
/*EXPORT-----------------------------------------------------------------------------------------*/
/*///////////////////////////////////////////////////////////////////////////////////////////////*/



export {__THEMES, __THEMES_NAMES, __THEMES_VALUES, __THEMES_PERSISTENTS, __THEMES_COLORS};