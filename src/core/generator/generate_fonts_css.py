import os

# Configuración: Define aquí las rutas según tus necesidades
FONTS_FOLDER = "../fonts"  # Ruta de la carpeta principal que contiene las subcarpetas de fuentes
OUTPUT_FILE = "../fonts/fonts.css"  # Nombre del archivo CSS de salida

def generate_css(fonts_folder, output_file):
    # Normalizar la ruta de la carpeta para asegurar compatibilidad
    fonts_folder = os.path.normpath(fonts_folder)
    
    # Verificar si la carpeta existe
    if not os.path.exists(fonts_folder):
        print(f"Error: La carpeta '{fonts_folder}' no existe.")
        return
    
    # Listar las carpetas principales (nombres de las tipografías)
    font_families = [d for d in os.listdir(fonts_folder) if os.path.isdir(os.path.join(fonts_folder, d))]
    
    if not font_families:
        print(f"Error: No se encontraron carpetas de tipografías dentro de '{fonts_folder}'.")
        return
    
    css_lines = []
    
    for font_family in font_families:
        font_folder = os.path.join(fonts_folder, font_family)
        
        # Procesar cada archivo dentro de la carpeta
        font_files = [f for f in os.listdir(font_folder) if f.endswith(('.ttf', '.otf', '.woff', '.woff2'))]
        
        if not font_files:
            print(f"Advertencia: No se encontraron archivos de fuente en la carpeta '{font_family}'.")
            continue
        
        for idx, font_file in enumerate(font_files):
            # Generar ruta relativa normalizada para uso web
            font_path = os.path.join(font_folder, font_file)
            font_path_web = font_path.replace("\\", "/")  # Convertir separadores a formato web
            
            font_format = font_file.split(".")[-1]
            font_name = f"{font_family}-{idx}"  # Nombre con índice
            
            # Ajustar el formato del archivo según la extensión
            if font_format == "ttf":
                font_format = "truetype"
            elif font_format == "otf":
                font_format = "opentype"
            elif font_format == "woff":
                font_format = "woff"
            elif font_format == "woff2":
                font_format = "woff2"
            
            # Generar el bloque @font-face
            css_lines.append(f"@font-face {{")
            css_lines.append(f"    font-family: '{font_name}';")
            css_lines.append(f"    src: url('{font_path_web}') format('{font_format}');")
            css_lines.append(f"}}")
            css_lines.append("")
    
    if css_lines:
        # Guardar el CSS generado en un archivo
        with open(output_file, "w", encoding="utf-8") as css_file:
            css_file.write("\n".join(css_lines))
        print(f"Archivo CSS generado correctamente en: {os.path.abspath(output_file)}")
    else:
        print("Error: No se generaron bloques CSS. Revisa la estructura de tus carpetas y archivos.")

# Ejecutar el script automáticamente con las variables configuradas
if __name__ == "__main__":
    print("=== Generador de CSS para fuentes (Google Fonts) ===")
    print(f"Usando carpeta de fuentes: {os.path.abspath(FONTS_FOLDER)}")
    print(f"Archivo de salida: {os.path.abspath(OUTPUT_FILE)}\n")
    
    generate_css(FONTS_FOLDER, OUTPUT_FILE)