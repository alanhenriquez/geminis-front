import { useState } from "react";
import { __THEMES, __THEMES_PERSISTENTS } from "../core/config/themes/themes";
import useCSSVariables from "../hooks/useCSSVariables";
import useEnum from "../hooks/useEnum";



/*///////////////////////////////////////////////////////////////////////////////////////////////*/
/*MANAGER----------------------------------------------------------------------------------------*/
/*///////////////////////////////////////////////////////////////////////////////////////////////*/



const __ManagerThemes = () => {



    /*===========================================================================================*/
    /* Use useStates ----------------------------------------------------------------------------*/



    const Themes_Names = useEnum({ DARK: "dark", LIGHT: "light", });
    const [Themes_Themes, setThemes_Themes] = useState(__THEMES);
    const [Themes_useSystemColorScheme, setThemes_useSystemColorScheme] = useState(false);
    const [Themes_Persistent, setThemes_Persistent] = useState(__THEMES_PERSISTENTS);



    /*===========================================================================================*/
    /* Use Hooks/customHooks --------------------------------------------------------------------*/



    const {
        currentTheme,
        switchTheme,
        updateVariable,
        switchAndUpdateVariables,
        getActivationOrder,
        getThemeVariables
    } = useCSSVariables({ 
        themesVariables: Themes_Themes, 
        useSystemColorScheme: Themes_useSystemColorScheme, 
        persistentVariables: Themes_Persistent 
    });



    /*===========================================================================================*/
    /* Define Methods ---------------------------------------------------------------------------*/



    const manager_utils = {
        toogleTheme: (e) => {
            e.preventDefault()
            if (currentTheme() === Themes_Names.DARK) { switchTheme(Themes_Names.LIGHT) }
            else if (currentTheme() === Themes_Names.LIGHT) { switchTheme(Themes_Names.DARK) };
        },
    }

    const manager_is = {
        isDarkTheme: () => currentTheme() === Themes_Names.DARK,
    };



    /*===========================================================================================*/
    /* Return -----------------------------------------------------------------------------------*/



    return {
        names: Themes_Names,
        theme: currentTheme,
        methods: {
            utils: manager_utils,
            is: manager_is
        },
    }
}



/*///////////////////////////////////////////////////////////////////////////////////////////////*/
/*EXPORT-----------------------------------------------------------------------------------------*/
/*///////////////////////////////////////////////////////////////////////////////////////////////*/



export default __ManagerThemes();