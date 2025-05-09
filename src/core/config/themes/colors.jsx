


/*///////////////////////////////////////////////////////////////////////////////////////////////*/
/*COLORS-----------------------------------------------------------------------------------------*/
/*///////////////////////////////////////////////////////////////////////////////////////////////*/



const colors = {

    SPECIALS: {
        w87: '#F9FAFB',
        snow: '#FFFCFF',
        platinum: '#DADDD8',
        alabaster: '#ECEBE4',
        anti_flash: '#EEF0F2',
        gost_white: '#FAFAFF',
        mint_cream: '#F8FFF4',
        white_cross: '#F8FAFC',
        baby_powder: '#FDFFFC',
        lorean_gray: '#E5E7EB',
        charcoal: '#64748B',
        clarence: '#F1F5F9',
        sea_salt: '#FAFAFA',
        alice_blue: '#E3F2FD',
        raisin_black: '#1E1E24',
        poison_black: '#111418',
        hula_black: '#05050E',
        manta_black: '#020816',
        dark_night: '#0F172A',
        penn_red: '#F71735',
        imperial_red: '#92140C',
        marian_red: '#EF4444',
        upper_red: '#DC2626',
        ma01: '#235FE3',
        zitonía: '#1E40AF',
        iconita: '#2563EB',
        blue_sky: '#1877F2',
        claritita: '#627086',
        lapiz_lazuli: '#235789',
        school_bus: '#F1D302',
        light_gray: '#D1D5DB',
    },

    TRANSPARENT: {
        transparent: '#FFFFFF00',
    },

    GRADIENT: {
        gradient_001: '#ffffff',
        gradient_002: '#f7f7f7',
        gradient_003: '#f2f2f2',
        gradient_004: '#ebebeb',
        gradient_005: '#e6e6e6',
        gradient_006: '#dfdfdf',
        gradient_007: '#d9d9d9',
        gradient_008: '#d3d3d3',
        gradient_009: '#cccccc',
        gradient_010: '#c7c7c7',
        gradient_011: '#bfbfbf',
        gradient_012: '#bcbcbc',
        gradient_013: '#b3b3b3',
        gradient_014: '#b0b0b0',
        gradient_015: '#a6a6a6',
        gradient_016: '#a4a4a4',
        gradient_017: '#999999',
        gradient_018: '#989898',
        gradient_019: '#8c8c8c',
        gradient_020: '#8d8d8d',
        gradient_021: '#808080',
        gradient_022: '#818181',
        gradient_023: '#737373',
        gradient_024: '#757575',
        gradient_025: '#666666',
        gradient_026: '#696969',
        gradient_027: '#595959',
        gradient_028: '#5e5e5e',
        gradient_029: '#4d4d4d',
        gradient_030: '#525252',
        gradient_031: '#404040',
        gradient_032: '#464646',
        gradient_033: '#333333',
        gradient_034: '#3b3b3b',
        gradient_035: '#262626',
        gradient_036: '#2f2f2f',
        gradient_037: '#1a1a1a',
        gradient_038: '#232323',
        gradient_040: '#171717',
        gradient_039: '#000000',
    },
    
    PALLETE: {
        RED: {
            red_001: '#ffcccc',
            red_002: '#ff9999',
            red_003: '#ff6666',
            red_004: '#ff4d4d',
            red_005: '#ff3333',
            red_006: '#ff1a1a',
            red_007: '#e60000',
            red_008: '#cc0000',
            red_009: '#b30000',
            red_010: '#990000',
            red_011: '#800000',
            red_012: '#660000',
            red_013: '#4d0000',
            red_014: '#330000',
            red_015: '#1a0000',
            red_016: '#e61919',
            red_017: '#ff4d4d',
            red_018: '#ffe6e6',
            red_019: '#ffb3b3',
            red_020: '#ff8080',
        },
    
        ORANAGE: {
            orange_001: '#fff1cc',
            orange_002: '#ffe6b3',
            orange_003: '#ffdb99',
            orange_004: '#ffcf80',
            orange_005: '#ffc466',
            orange_006: '#ffb94d',
            orange_007: '#ffae33',
            orange_008: '#ffa319',
            orange_009: '#e69500',
            orange_010: '#cc8400',
            orange_011: '#b37400',
            orange_012: '#996300',
            orange_013: '#805200',
            orange_014: '#664200',
            orange_015: '#4d3100',
            orange_016: '#332100',
            orange_017: '#1a1000',
            orange_018: '#ffb366',
            orange_019: '#ffe5cc',
            orange_020: '#ffcc99',
        },
    
        YELLOW: {
            yellow_001: '#ffffe6',
            yellow_002: '#ffffcc',
            yellow_003: '#ffffb3',
            yellow_004: '#ffff99',
            yellow_005: '#ffff80',
            yellow_006: '#ffff66',
            yellow_007: '#ffff4d',
            yellow_008: '#ffff33',
            yellow_009: '#ffff1a',
            yellow_010: '#e6e600',
            yellow_011: '#cccc00',
            yellow_012: '#b3b300',
            yellow_013: '#999900',
            yellow_014: '#808000',
            yellow_015: '#666600',
            yellow_016: '#4d4d00',
            yellow_017: '#333300',
            yellow_018: '#e6e68a',
            yellow_019: '#ffff99',
            yellow_020: '#ffffb3',
        },
    
        GREEN: {
            green_001: '#80ff80',
            green_002: '#66ff66',
            green_003: '#4dff4d',
            green_004: '#33ff33',
            green_005: '#1aff1a',
            green_006: '#00ff00',
            green_007: '#00e600',
            green_008: '#00cc00',
            green_009: '#00b300',
            green_010: '#009900',
            green_011: '#008000',
            green_012: '#006600',
            green_013: '#004d00',
            green_014: '#003300',
            green_015: '#001a00',
            green_016: '#80ff80',
            green_017: '#aaffaa',
            green_018: '#00ff80',
            green_019: '#00ffb3',
            green_020: '#00ffc4',
        },
    
        CYAN: {
            cyan_001: '#e6ffff',
            cyan_002: '#ccffff',
            cyan_003: '#b3ffff',
            cyan_004: '#99ffff',
            cyan_005: '#80ffff',
            cyan_006: '#66ffff',
            cyan_007: '#4dffff',
            cyan_008: '#33ffff',
            cyan_009: '#1affff',
            cyan_010: '#00ffff',
            cyan_011: '#00e6e6',
            cyan_012: '#00cccc',
            cyan_013: '#00b3b3',
            cyan_014: '#009999',
            cyan_015: '#008080',
            cyan_016: '#006666',
            cyan_017: '#004d4d',
            cyan_018: '#ccefff',
            cyan_019: '#b3e6ff',
            cyan_020: '#99ddff',
        },
    
        BLUE: {
            blue_001: '#e6e6ff',
            blue_002: '#ccccff',
            blue_003: '#b3b3ff',
            blue_004: '#9999ff',
            blue_005: '#8080ff',
            blue_006: '#6666ff',
            blue_007: '#4d4dff',
            blue_008: '#3333ff',
            blue_009: '#1a1aff',
            blue_010: '#0000ff',
            blue_011: '#0000e6',
            blue_012: '#0000cc',
            blue_013: '#0000b3',
            blue_014: '#000099',
            blue_015: '#000080',
            blue_016: '#000066',
            blue_017: '#00004d',
            blue_018: '#99b3ff',
            blue_019: '#8099ff',
            blue_020: '#6680ff',
        },
    
        VIOLETE: {
            violet_001: '#ffe6ff',
            violet_002: '#ffccff',
            violet_003: '#ffb3ff',
            violet_004: '#ff99ff',
            violet_005: '#ff80ff',
            violet_006: '#ff66ff',
            violet_007: '#ff4dff',
            violet_008: '#ff33ff',
            violet_009: '#ff1aff',
            violet_010: '#ff00ff',
            violet_011: '#e600e6',
            violet_012: '#cc00cc',
            violet_013: '#b300b3',
            violet_014: '#990099',
            violet_015: '#800080',
            violet_016: '#660066',
            violet_017: '#4d004d',
            violet_018: '#cc99cc',
            violet_019: '#b380b3',
            violet_020: '#996699',
        },
    
        FUCHSIA: {
            fuchsia_001: '#FFE6F3FF',
            fuchsia_002: '#FFCCEBFF',
            fuchsia_003: '#FFB3E3FF',
            fuchsia_004: '#FF99DBFF',
            fuchsia_005: '#FF80D4FF',
            fuchsia_006: '#FF66CCFF',
            fuchsia_007: '#FF4DC4FF',
            fuchsia_008: '#FF33BCFF',
            fuchsia_009: '#FF1AB5FF',
            fuchsia_010: '#FF00ADFF',
            fuchsia_011: '#E6009EFF',
            fuchsia_012: '#DC008FFF',
            fuchsia_013: '#D20080FF',
            fuchsia_014: '#C80071FF',
            fuchsia_015: '#BE0062FF',
            fuchsia_016: '#B50054FF',
            fuchsia_017: '#A80046FF',
            fuchsia_018: '#9F0039FF',
            fuchsia_019: '#95002CFF',
            fuchsia_020: '#8C001FFF',
        },
    }
};



/*///////////////////////////////////////////////////////////////////////////////////////////////*/
/*EXPORT-----------------------------------------------------------------------------------------*/
/*///////////////////////////////////////////////////////////////////////////////////////////////*/



export default colors;