@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo ========================================
echo  🔍 MIGRACION DE IMAGENES A APPIMAGE
echo ========================================
echo.

set "contador=0"

:: Procesar components
echo Procesando archivos en components...
for /r "components" %%f in (*.vue) do (
    call :procesar "%%f"
)

:: Procesar pages
echo.
echo Procesando archivos en pages...
for /r "pages" %%f in (*.vue) do (
    call :procesar "%%f"
)

:: Procesar layouts (si existe)
if exist "layouts" (
    echo.
    echo Procesando archivos en layouts...
    for /r "layouts" %%f in (*.vue) do (
        call :procesar "%%f"
    )
)

echo.
echo ========================================
echo  ✅ MIGRACION COMPLETADA!
echo  📝 Archivos procesados: %contador%
echo  ⚠️ Revisa los archivos .bak si hay problemas
echo ========================================
pause
exit /b

:procesar
set "file=%~1"
set "filename=%~nx1"

:: Verificar si el archivo contiene <img>
findstr /c:"<img " "%file%" >nul 2>&1
if errorlevel 1 goto :eof

set /a contador+=1
echo.
echo 📝 [%contador%] Procesando: %filename%

:: Crear backup
copy "%file%" "%file%.bak" >nul

:: Crear archivo temporal
set "tempfile=%file%.tmp"

:: Reemplazar usando findstr y un archivo temporal
(
    for /f "usebackq delims=" %%a in ("%file%") do (
        set "line=%%a"
        set "line=!line:<img =<AppImage !"
        set "line=!line: loading="lazy"= loading-strategy="lazy"!"
        set "line=!line: class="= image-class="!"
        set "line=!line: src="= :src="!"
        echo(!line!
    )
) > "%tempfile%"

:: Reemplazar archivo original
move "%tempfile%" "%file%" >nul

echo ✅ Modificado: %filename%
goto :eof